#install python dependencies
FROM python:3.7 as builder

WORKDIR /app

RUN pip3 install --user scikit-image && \
    pip3 install --user scikit-learn && \
    pip3 install --user imageio && \
    pip3 install --user numpy

#build nodejs backend
FROM node:14
WORKDIR /app

COPY . .

COPY --from=builder /root/.local /root/.local
ENV PATH=/root/.local/bin:$PATH
ENV PYTHONPATH=/root/.local/lib/python3.7/site-packages

RUN npm install

EXPOSE 3000

CMD ["node", "server.js"]