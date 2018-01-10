import React, { Component } from 'react';
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import Cropper from 'react-cropper';

const CLOUDINARY_UPLOAD_PRESET = 'hoangnam';
const CLOUDINARY_UPLOAD_URL =
  'https://api.cloudinary.com/v1_1/cocacode2/upload';

class ImageUploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadedFile: null,
      uploadedFileCloudinaryUrl:
        'https://res.cloudinary.com/cocacode2/image/upload/v1515550702/wwsqbsi7kxcz0zgj70j6.png',
    };
  }

  onImageDrop(files) {
    console.log(files[0]);
    this.setState({
      uploadedFile: files[0],
      uploadedFileUrl: files[0].preview,
    });

    // this.handleImageUpload(files[0]);
  }

  _crop() {
    // image in dataUrl
    // console.log('cropping');
    // console.log(b64toBlob(this.cropper.getCroppedCanvas().toDataURL()));
    this.setState({
      dataUrl: this.cropper.getCroppedCanvas().toDataURL(),
    });

    // console.log(file);
    // this.refs.cropper.getCroppedCanvas().toDataURL();
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
  upload() {
    const xhr = new XMLHttpRequest();
    const fd = new FormData();
    xhr.open('POST', CLOUDINARY_UPLOAD_URL, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // File uploaded successfully
        const response = JSON.parse(xhr.responseText);
        // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg

        this.setState({
          uploadedFileCloudinaryUrl: response.secure_url,
        });
        // Create a thumbnail of the uploaded image, with 150px width
        // const tokens = url.split('/');
        // tokens.splice(-2, 0, 'w_150,c_scale');
        // const img = new Image(); // HTML5 Constructor
        // img.src = tokens.join('/');
        // img.alt = response.public_id;
        // document.body.appendChild(img);
      }
    };

    fd.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
    fd.append('file', this.state.dataUrl);
    xhr.send(fd);
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
              <div> Drop an image or click to select a file to upload. </div>{' '}
            </Dropzone>
          </div>
          <div>
            {' '}
            {this.state.uploadedFileCloudinaryUrl === '' ? null : (
              <div>
                {' '}
                {/* <p> {this.state.uploadedFile.name} </p>{' '} */}
                <img src={this.state.uploadedFileCloudinaryUrl} />{' '}
              </div>
            )}{' '}
          </div>{' '}
        </form>{' '}
        <button onClick={this.upload.bind(this)}> Upload </button>{' '}
        <Cropper
          ref={node => {
            this.cropper = node;
          }}
          src={this.state.uploadedFileUrl}
          style={{
            height: 400,
            width: 400,
          }}
          // Cropper.js options
          aspectRatio={1 / 1}
          guides={false}
          crop={this._crop.bind(this)}
        />{' '}
      </div>
    );
  }
}

export default ImageUploader;
