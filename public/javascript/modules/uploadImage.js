import { get } from './shortDom';
import { showModal } from './modal';
import axios from 'axios';

function preUpload(event) {
  const [image] = event.target.files;
  const reader = new FileReader();

  const modal = get(".modal");
  const thumb = get("img.thumb", modal);

  thumb.alt = image.name;

  reader.onload = (event) => thumb.src = event.target.result;
  reader.readAsDataURL(image);
}


function uploadImage(e) {
  e.preventDefault()

  const modal = get(".modal");
  const content = get(".modal__content", modal);

  axios.get(this.href)
    .then(res => {
      content.innerHTML = `
        <div class="upload form">
          <p class="upload__message"> Share a new image! </p>
          <form class="form__image col" action="/api/${res.data}/upload" method="POST" enctype="multipart/form-data">
            <label for="photo" class="upload__label row">
              <img class="thumb">
              <input type="file" name="photo" id="photo" accept="image/png, image/jpeg" required />
            </label>
            <textarea name="caption" placeholder="Write a caption..." maxlength="140"></textarea>
            <input class="button" type="submit" value="Share"/>
          </form>
        </div>
      `
      showModal()
      const input = get('input[type="file"]', modal)
      input.onchange = () => preUpload(event);
    })

}


export default uploadImage