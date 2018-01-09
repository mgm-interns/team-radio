import React, { Component } from 'react';
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import Cropper from 'react-cropper';

const CLOUDINARY_UPLOAD_PRESET = 'hoangnam';
const CLOUDINARY_UPLOAD_URL =
  'https://api.cloudinary.com/v1_1/cocacode2/upload';

const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
  const byteCharacters = atob(b64Data.split(',')[1]);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

function dataURItoBlob(dataURI) {
  // convert base64 to raw binary data held in a string
  const byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  const mimeString = dataURI
    .split(',')[0]
    .split(':')[1]
    .split(';')[0];

  // write the bytes of the string to an ArrayBuffer
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const _ia = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    _ia[i] = byteString.charCodeAt(i);
  }

  const dataView = new DataView(arrayBuffer);
  const blob = new Blob([dataView], { type: mimeString });
  return blob;
}

class ImageUploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadedFile: null,
      uploadedFileCloudinaryUrl: '',
    };
  }

  onImageDrop(files) {
    console.log(files[0]);
    this.setState({
      uploadedFile: files[0],
    });

    this.handleImageUpload(files[0]);
  }

  _crop() {
    // image in dataUrl
    console.log('cropping');
    console.log(b64toBlob(this.cropper.getCroppedCanvas().toDataURL()));
    // this.refs.cropper.getCroppedCanvas().toDataURL();
    // request
    //   .get(this.refs.cropper.getCroppedCanvas().toDataURL())
    //   .end((err, res) => {
    //     console.log(res.blob());
    //   });
  }

  handleImageUpload(file) {
    const upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url,
        });
      }
    });
  }

  render() {
    return (
      <div>
        <form>
          <div className="FileUpload">
            <Dropzone
              onDrop={this.onImageDrop.bind(this)}
              multiple={false}
              accept="image/*"
            >
              <div>Drop an image or click to select a file to upload.</div>
            </Dropzone>
          </div>

          <div>
            {this.state.uploadedFileCloudinaryUrl === '' ? null : (
              <div>
                <p>{this.state.uploadedFile.name}</p>
                <img src={this.state.uploadedFileCloudinaryUrl} />
              </div>
            )}
          </div>
        </form>
        <Cropper
          ref={node => {
            this.cropper = node;
          }}
          src="https://res.cloudinary.com/cocacode2/image/upload/v1515481163/a2dv4amchfitkfiizl3q.jpg"
          style={{ height: 400, width: '100%' }}
          // Cropper.js options
          aspectRatio={16 / 9}
          guides={false}
          crop={this._crop.bind(this)}
        />
      </div>
    );
  }
}

export default ImageUploader;
