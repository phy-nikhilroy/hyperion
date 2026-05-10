FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY ingest.py ./
# CSV backup volume — mount /var/log/hyperion on the host to persist
VOLUME ["/var/log/hyperion"]
CMD ["python", "ingest.py"]
