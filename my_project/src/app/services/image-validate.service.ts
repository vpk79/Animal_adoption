import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageValidateService {

  constructor() { }


  validateImage(file: File, maxSizeInBytes: number, maxWidth: number, maxHeight: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      let isValid = true; // Флаг, който указва дали размерите на изображението са валидни

      // Проверка на размера на файла
      if (file.size > maxSizeInBytes) {
        console.error('File size exceeds the maximum allowed size.');
        isValid = false;
      }

      // Проверка за размерите на изображението (ако файлът е изображение)
      if (file.type.startsWith('image/')) {
        const img = new Image();
        img.src = window.URL.createObjectURL(file);
        img.onload = () => {
          if (img.width > maxWidth || img.height > maxHeight) {
            console.error('Image dimensions exceed the maximum allowed dimensions.');
            isValid = false;
          }

          resolve(isValid);
        };
        img.onerror = () => {
          console.error('Error loading image.');
          isValid = false;
          resolve(isValid);
        };
      } else {
        resolve(isValid);
      }
    });
  }
}
