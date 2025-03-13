import streamlit as st

# ✅ Set page config as the FIRST Streamlit command
st.set_page_config(page_title="Yellow Rust Detection", page_icon="🌾", layout="wide")

import numpy as np
import cv2
import tensorflow as tf
import matplotlib.pyplot as plt
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from PIL import Image
import time

# Load Model
@st.cache_resource
def load_trained_model():
    return load_model("vgg16_model.h5")

model = load_trained_model()

# Class Names & Detailed Recommendations
class_names = [
    'No disease', 'Resistant', 'Moderately Resistant', 
    'Moderately Resistant-Moderately Susceptible', 'Moderately Susceptible', 'Susceptible'
]

recommendations = {
    'No disease': """
     **Healthy Crop**  
    - No immediate action needed.  
    - Maintain proper irrigation and soil health.  
    - Regularly inspect for early signs of infection.  
    - Apply balanced fertilizers to boost immunity.  
    """,

    'Resistant': """
     **Resistant Crop - Low Risk**  
    - Monitor for symptoms but no urgent action required.  
    - Continue using resistant wheat varieties.  
    - Maintain crop rotation to prevent pathogen buildup.  
    - Ensure soil pH is between 6.0-7.0 for optimal health.  
    """,

    'Moderately Resistant': """
     **Minor Infection - Take Precaution**  
    - Apply mild fungicides like **Propiconazole (Tilt)** or **Azoxystrobin**.  
    - Increase air circulation around crops.  
    - Use **organic treatments** like neem oil or copper-based fungicides.  
    - Remove infected leaves to prevent further spread.  
    """,

    'Moderately Resistant-Moderately Susceptible': """
     **Moderate Infection - Immediate Action Needed**  
    - Use **systemic fungicides** like **Tebuconazole (Folicur)** or **Flutriafol**.  
    - Avoid overhead watering to reduce moisture on leaves.  
    - Implement **integrated pest management (IPM)** strategies.  
    - Increase potassium and phosphorus fertilizers to strengthen resistance.  
    - Isolate affected plants and disinfect tools.  
    """,

    'Moderately Susceptible': """
     **High Risk - Major Infection Detected**  
    - Apply **combination fungicides** like **Mancozeb + Triazole (Nativo, Amistar Top)**.  
    - Spray **Copper Oxychloride** for bacterial protection.  
    - Adjust field drainage to prevent excess moisture.  
    - Reduce nitrogen-based fertilizers to slow disease progression.  
    - Conduct weekly monitoring and remove severely infected plants.  
    """,

    'Susceptible': """
     **Critical Infection - Emergency Response Required**  
    - **Quarantine and completely remove infected plants.**  
    - Apply **strong fungicides** like **Carbendazim (Bavistin) + Tricyclazole (Beam)** immediately.  
    - **Sanitize tools and machinery** after handling infected plants.  
    - Avoid replanting wheat in the same field for **at least 2 seasons**.  
    - Introduce **biological control agents** like **Trichoderma harzianum** for long-term protection.  
    - Seek expert guidance for large-scale outbreaks.  
    """
}

def generate_grad_cam_heatmap(img_array, class_index, layer_name="block5_conv3"):
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

def predict_disease(img):
    img_array = np.array(img.resize((224, 224))) / 255.0
    img_array = img_array.reshape(1, 224, 224, 3)
    
    with st.spinner("Analyzing... Please wait"):
        time.sleep(2)  # Simulating processing time
        predicted_label = model.predict(img_array)
    
    predicted_class_index = np.argmax(predicted_label)
    predicted_class = class_names[predicted_class_index]
    
    # Generate Grad-CAM heatmap
    heatmap = generate_grad_cam_heatmap(img_array, predicted_class_index)
    heatmap = cv2.applyColorMap(np.uint8(255 * heatmap), cv2.COLORMAP_JET)
    heatmap = cv2.cvtColor(heatmap, cv2.COLOR_BGR2RGB)

    # Superimpose heatmap on original image
    superimposed_img = np.uint8(255 * img_array[0])
    superimposed_img = cv2.addWeighted(superimposed_img, 0.6, heatmap, 0.4, 0)

    return predicted_class, recommendations[predicted_class], superimposed_img

# Streamlit UI
st.title("Yellow Rust Detection in Wheat")

# Sidebar
st.sidebar.header("How to Use")
st.sidebar.write("1️. Upload a clear image of a wheat leaf.\n"
                 "\n2️. Click 'Analyze Disease' to get predictions.\n"
                 "\n3️. View AI-generated Grad-CAM heatmap.\n"
                 "\n4️. Follow treatment recommendations.")

uploaded_file = st.file_uploader("Upload an image of wheat leaf", type=["jpg", "png", "jpeg"])

if uploaded_file is not None:
    img = Image.open(uploaded_file)
    st.subheader("Uploaded Image")
    st.image(img, caption="Your Uploaded Image", use_column_width=True)
    
    if st.button("Analyze Disease"):
        prediction, recommendation, heatmap_img = predict_disease(img)

        # Progress bar animation
        progress_bar = st.progress(0)
        for percent_complete in range(100):
            time.sleep(0.02)
            progress_bar.progress(percent_complete + 1)
        progress_bar.empty()

        st.success(f"**Prediction: {prediction}**")
        st.markdown(recommendation, unsafe_allow_html=True)

        # Side-by-side image display
        col1, col2 = st.columns(2)
        with col1:
            st.subheader("Original Image")
            st.image(img, use_column_width=True)

        with col2:
            st.subheader("Heatmap")
            st.image(heatmap_img, use_column_width=True)

        # Download button for heatmap
        st.download_button(
            label="Download Heatmap",
            data=cv2.imencode(".png", cv2.cvtColor(heatmap_img, cv2.COLOR_RGB2BGR))[1].tobytes(),
            file_name="wheat_disease_heatmap.png",
            mime="image/png"
        )

# Footer
# st.markdown(
#     """
#     ---
#     **Developed by CSEA 2025** | Yellow Rust Detection   
#     **Disclaimer:** This tool is for informational purposes only. Consult an agricultural expert for professional advice.
#     """
# )
