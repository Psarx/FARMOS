import streamlit as st
import numpy as np
import cv2
import tensorflow as tf
import matplotlib.pyplot as plt
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from PIL import Image

# Load model
@st.cache_resource
def load_trained_model():
    return load_model("vgg16_model.h5")

model = load_trained_model()

# Class names & recommendations
class_names = ['No disease', 'Resistant', 'Moderately Resistant', 'Moderately Resistant-Moderately Susceptible', 'Moderately Susceptible', 'Susceptible']
recommendations = {
    'No disease': "✅ **Healthy Crop** - No action needed.",
    'Resistant': "🛡 **Resistant Crop** - Maintain monitoring.",
    'Moderately Resistant': "⚠ **Minor Infection** - Apply fungicide.",
    'Moderately Resistant-Moderately Susceptible': "🔴 **Moderate Infection** - Isolate affected crops.",
    'Moderately Susceptible': "🆘 **High Risk** - Apply strong fungicide immediately.",
    'Susceptible': "🚨 **Critical Infection** - Quarantine & sanitize field."
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
    predicted_label = model.predict(img_array)
    predicted_class_index = np.argmax(predicted_label)
    predicted_class = class_names[predicted_class_index]
    heatmap = generate_grad_cam_heatmap(img_array, predicted_class_index)
    heatmap = cv2.applyColorMap(np.uint8(255 * heatmap), cv2.COLORMAP_JET)
    heatmap = cv2.cvtColor(heatmap, cv2.COLOR_BGR2RGB)
    superimposed_img = np.uint8(255 * img_array[0])
    superimposed_img = cv2.addWeighted(superimposed_img, 0.6, heatmap, 0.4, 0)
    return predicted_class, recommendations[predicted_class], superimposed_img

# Streamlit UI
st.title("🌾 Wheat Disease Detection with Grad-CAM")
uploaded_file = st.file_uploader("Upload an image of wheat leaf", type=["jpg", "png", "jpeg"])
if uploaded_file is not None:
    img = Image.open(uploaded_file)
    st.image(img, caption="Uploaded Image", use_column_width=True)
    if st.button("Analyze Disease"):
        prediction, recommendation, heatmap_img = predict_disease(img)
        st.success(f"🔍 Prediction: {prediction}")
        st.write(recommendation)
        st.image(heatmap_img, caption="Grad-CAM Heatmap", use_column_width=True)
