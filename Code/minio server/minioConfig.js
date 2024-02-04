import * as Minio from 'minio';

var minioClient = new Minio.Client({
    endPoint: '10.8.0.31',
    port: 9000,
    useSSL: false,
    accessKey: 'WzM0t4CtfRYLW6x6',
    secretKey: 'RUSePhuOg9QIVicMxrn0zpzBRHST7xF2'
});

export {
    minioClient
}