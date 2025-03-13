import streamlit as st
import matplotlib.pyplot as plt
from keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import cv2
import tensorflow as tf
from PIL import Image
import io

# Set page config
st.set_page_config(
    page_title="Wheat Disease Predictor",
    page_icon="🌾",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Custom CSS for black and white theme
st.markdown("""
    <style>
    /* Main app styling */
    .stApp {
        background-color: #000000;
        color: #ffffff;
    }
    
    /* Main content area */
    .main {
        background-color: #000000;
        padding: 2rem;
    }
    
    /* Title styling */
    .title-text {
        color: #ffffff;
        text-align: center;
        padding: 1.5rem 0;
        font-family: 'Arial Black', sans-serif;
        text-transform: uppercase;
        letter-spacing: 2px;
    }
    
    /* Prediction box styling */
    .prediction-box {
        background-color: #1a1a1a;
        padding: 25px;
        border-radius: 15px;
        box-shadow: 0 4px 6px rgba(255,255,255,0.1);
        margin: 10px 0;
        border: 1px solid #333;
    }
    
    /* Upload button styling */
    .stFileUploader {
        padding: 20px;
        background-color: #1a1a1a;
        border-radius: 10px;
        margin: 20px 0;
    }
    
    /* Progress bar styling */
    .stProgress > div > div {
        background-color: #ffffff;
    }
    
    /* Text elements */
    .prediction-text {
        color: #ffffff;
        font-size: 1.2rem;
        margin: 10px 0;
    }
    
    /* Subheader styling */
    .subheader {
        color: #ffffff;
        border-bottom: 2px solid #333;
        padding-bottom: 10px;
        margin: 20px 0;
        font-weight: bold;
    }
    
    /* Custom divider */
    .divider {
        height: 2px;
        background-color: #333;
        margin: 20px 0;
    }
    
    /* Button styling */
    .stButton > button {
        background-color: #ffffff;
        color: #000000;
        border-radius: 5px;
        padding: 10px 20px;
        font-weight: bold;
    }
    
    /* Hover effect for boxes */
    .prediction-box:hover {
        transform: translateY(-2px);
        transition: transform 0.3s ease;
        box-shadow: 0 6px 8px rgba(255,255,255,0.15);
    }
    </style>
""", unsafe_allow_html=True)

@st.cache_resource
def load_prediction_model():
    return load_model('vgg16_model.h5')

def generate_grad_cam_heatmap(model, img_array, class_index, layer_name="block5_conv3"):
    last_conv_layer = model.get_layer(layer_name)
    grad_model = tf.keras.models.Model([model.input], [last_conv_layer.output, model.output])
    
    with tf.GradientTape() as tape:
        conv_outputs, predictions = grad_model(img_array)
        loss = predictions[:, class_index]
    
    grads = tape.gradient(loss, conv_outputs)
    pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))
    conv_outputs = conv_outputs[0]
    heatmap = np.mean(conv_outputs * pooled_grads.numpy(), axis=-1)
    heatmap = np.maximum(heatmap, 0)
    heatmap = cv2.resize(heatmap, (img_array.shape[2], img_array.shape[1]))
    heatmap = heatmap / np.max(heatmap)
    
    return heatmap

def process_image(upload):
    img = Image.open(upload)
    img = img.resize((224, 224))
    img_array = np.array(img)
    img_array = img_array / 255.0
    img_array = img_array.reshape(1, 224, 224, 3)
    return img, img_array

def create_custom_plt_style():
    plt.style.use('dark_background')
    plt.rcParams['figure.facecolor'] = '#1a1a1a'
    plt.rcParams['axes.facecolor'] = '#1a1a1a'
    plt.rcParams['text.color'] = 'white'
    plt.rcParams['axes.labelcolor'] = 'white'
    plt.rcParams['xtick.color'] = 'white'
    plt.rcParams['ytick.color'] = 'white'

def main():
    try:
        # Title and description
        st.markdown("<h1 class='title-text'>WHEAT DISEASE PREDICTION</h1>", unsafe_allow_html=True)
        st.markdown("""
            <div style='text-align: center; padding: 0 0 2rem 0; color: #cccccc;'>
                Advanced AI-powered disease detection system for wheat plants
            </div>
        """, unsafe_allow_html=True)
        
        # Load model
        model = load_prediction_model()
        
        # File uploader with custom styling
        st.markdown("<div class='prediction-box'>", unsafe_allow_html=True)
        upload = st.file_uploader("Upload wheat plant image", type=['jpg', 'jpeg', 'png'])
        st.markdown("</div>", unsafe_allow_html=True)
        
        if upload is not None:
            # Process image and make prediction
            img, img_array = process_image(upload)
            predicted_label = model.predict(img_array)
            class_names = ['No disease', 'Resistant', 'Moderately Resistant', 
                          'Moderately Resistant-Moderately Susceptible', 
                          'Moderately Susceptible', 'Susceptible']
            predicted_class_index = np.argmax(predicted_label)
            predicted_class = class_names[predicted_class_index]
            
            # Generate Grad-CAM heatmap
            heatmap = generate_grad_cam_heatmap(model, img_array, predicted_class_index)
            heatmap = cv2.applyColorMap(np.uint8(255 * heatmap), cv2.COLORMAP_JET)
            heatmap = cv2.cvtColor(heatmap, cv2.COLOR_BGR2RGB)
            
            # Create two columns
            col1, col2 = st.columns(2)
            
            # Set custom matplotlib style
            create_custom_plt_style()
            
            # Original image with prediction
            with col1:
                st.markdown("<div class='prediction-box'>", unsafe_allow_html=True)
                st.markdown("<h3 class='subheader'>Analysis Results</h3>", unsafe_allow_html=True)
                
                fig, ax = plt.subplots(figsize=(8, 8))
                ax.imshow(img)
                ax.set_title(f"Prediction: {predicted_class}", pad=20, color='white')
                ax.axis('off')
                st.pyplot(fig)
                plt.close()
                
                st.markdown("<h4 class='subheader'>Confidence Analysis</h4>", unsafe_allow_html=True)
                for i, (class_name, score) in enumerate(zip(class_names, predicted_label[0])):
                    st.progress(float(score))
                    st.markdown(f"<div class='prediction-text'>{class_name}: {score:.2%}</div>", 
                              unsafe_allow_html=True)
                st.markdown("</div>", unsafe_allow_html=True)
            
            # Grad-CAM visualization
            with col2:
                st.markdown("<div class='prediction-box'>", unsafe_allow_html=True)
                st.markdown("<h3 class='subheader'>AI Visualization</h3>", unsafe_allow_html=True)
                
                superimposed_img = np.uint8(255 * img_array[0])
                superimposed_img = cv2.addWeighted(superimposed_img, 0.6, heatmap, 0.4, 0)
                
                fig, ax = plt.subplots(figsize=(8, 8))
                ax.imshow(superimposed_img)
                ax.set_title("Disease Detection Heatmap", pad=20, color='white')
                ax.axis('off')
                st.pyplot(fig)
                plt.close()
                
                st.markdown("""
                    <div style='padding: 1rem 0; color: #cccccc;'>
                        <h4 style='color: white;'>Understanding the Heatmap:</h4>
                        <ul>
                            <li>Red zones: High-impact areas for disease detection</li>
                            <li>Blue zones: Lower-impact areas</li>
                            <li>This visualization reveals the specific regions analyzed by the AI</li>
                        </ul>
                    </div>
                """, unsafe_allow_html=True)
                st.markdown("</div>", unsafe_allow_html=True)

    except Exception as e:
        st.error(f"An error occurred: {str(e)}")
        st.markdown("""
            <div class='prediction-box' style='text-align: center;'>
                Please ensure all dependencies are installed and the model file is present.
            </div>
        """, unsafe_allow_html=True)

if __name__ == "__main__":
    main()