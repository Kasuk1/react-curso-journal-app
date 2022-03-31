import { fileUpload } from '../../helpers/fileUpload';
import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: 'dvznxzu2e',
  api_key: '521586857659914',
  api_secret: '3WDPuLddR7nv9Mt7IUMVUlN4bGI',
  secure: true,
});

describe('fileUpload helper Tests', () => {
  test('should upload a file and return the url', async (done) => {
    const resp = await fetch(
      'https://yt3.ggpht.com/proxy/b2Q6ur12v6ILzHPzhhXAyRKUzck8qebRTde53pN0paXUOAgfDTw2Kjm7WEntb2kzd2GW8MwFS408PMvoAdnCwXrP2MsMJNN1N7PQ5VFrxENzyaoI4BOdjy_Z428PPwNHbU5m3Uuc7JnIGfz_gRm02FaDXmDe8q05ucKzgzwVoNU4M0df8R8CGvVyKrx3nRlLRAIdO6toKaXn8I2fJPBBYaIIw-4VF5H14RO7IKzDCh2NwKGkk89ewFiDaKyXJwhds8HHf9EXMmb-YEZMnSk=-w400-h400-n-rj-c0xffffffff'
    );
    const blob = await resp.blob();
    const file = new File([blob], 'image.jpg');

    const url = await fileUpload(file);

    expect(typeof url).toBe('string');

    //Borrar imagen por id
    const segments = url.split('/');
    const imageId = segments[segments.length - 1].replace('.jpg', '');

    cloudinary.v2.api.delete_resources(imageId, {}, () => {
      done();
    });
  });

  test('should return an error', async () => {
    const file = new File([], 'image.jpg');

    const url = await fileUpload(file);

    expect(url).toBe(null);
  });
});
