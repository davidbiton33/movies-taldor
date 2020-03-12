import { Pipe, PipeTransform } from '@angular/core';



@Pipe({ name: 'activeLink' })
export class ActiveLink implements PipeTransform {
  transform(url: string) {
    //make request
    fetch(url, {method: 'GET^'})
      .then((response) => {
        console.log('Success, '+url);
          return url;
        })
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
          console.error('Error:', error);
          return "This link unactivate";
      });
    //if valid , return the link

    //else return "This link unactivate"
  }
}

