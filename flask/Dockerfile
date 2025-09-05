# Use Python 3.10 base (works with MediaPipe)
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Install system dependencies for OpenCV + MediaPipe
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Expose port (Flask/SocketIO will bind here)
EXPOSE 5000

# Run the app
CMD ["python", "app.py"]
