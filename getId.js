const http = require('http');
var request = require('request');

const fs = require('fs');
const token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJiYWNrb2ZmaWNlIiwic2NvcGVzIjp7Im1vZHVsZS1zYWxlcyI6eyJzYWxlcy1zdWJzY3JpcHRpb25zIjpbImxpc3QiLCJnZXQiLCJkZWxldGUiLCJ1cGRhdGUiLCJjcmVhdGUiLCJtb2R1bGUiXSwic2FsZXMtY29udGFjdHMiOlsiZ2V0IiwidXBkYXRlIiwiZGVsZXRlIiwiY3JlYXRlIiwibGlzdCJdLCJzYWxlcy1hZGRyZXNzIjpbImRlbGV0ZSIsInVwZGF0ZSIsImxpc3QiLCJnZXQiLCJjcmVhdGUiXSwic2FsZXMtb3JkZXJzIjpbImxpc3QiLCJ1cGRhdGUiLCJnZXQiLCJkZWxldGUiLCJjcmVhdGUiLCJtb2R1bGUiXSwic2FsZXMtY3VzdG9tZXJzIjpbImxpc3QiLCJjcmVhdGUiLCJ1cGRhdGUiLCJkZWxldGUiLCJnZXQiLCJtb2R1bGUiXX0sIm1vZHVsZS1wb3N0dmVudGEiOnsicG9zdHZlbnRhLWluZGljYXRvcnMiOlsibGlzdCIsIm1vZHVsZSJdLCJwb3N0dmVudGEtcmVwb3J0cyI6WyJsaXN0IiwidXBkYXRlIiwiY3JlYXRlIiwibW9kdWxlIl0sInBvc3R2ZW50YS1tYWludGVuYW5jZXMiOlsibGlzdCIsInVwZGF0ZSIsImRlbGV0ZSIsImNyZWF0ZSIsIm1vZHVsZSJdfSwibW9kdWxlLWJpbGxpbmciOnsiYmlsbGluZy1kZWJpdG5vdGVzIjpbImxpc3QiLCJnZXQiLCJjcmVhdGUiLCJtb2R1bGUiXSwiYmlsbGluZy1wYXltZW50ZG9jcyI6WyJsaXN0IiwiY3JlYXRlIiwiZ2V0IiwibW9kdWxlIl0sImJpbGxpbmctcGh5c2ljYWxlbWlzc2lvbnMiOlsibGlzdCIsImdldCIsImNyZWF0ZSJdLCJiaWxsaW5nLWNyZWRpdG5vdGVzIjpbImdldCIsImNyZWF0ZSIsImxpc3QiLCJtb2R1bGUiXSwiYmlsbGluZy1lbWlzc2lvbnN0YXRpb25zIjpbInVwZGF0ZSIsImxpc3QiLCJkZWxldGUiLCJjcmVhdGUiLCJnZXQiLCJtb2R1bGUiXSwiYmlsbGluZy1jb3JyZWxhdGl2ZXMiOlsibGlzdCIsImRlbGV0ZSIsInVwZGF0ZSIsImNyZWF0ZSIsImdldCIsIm1vZHVsZSJdfSwibW9kdWxlLXNpdGVzIjp7fSwibW9kdWxlLXNlY3VyaXR5Ijp7InNlY3VyaXR5LXJvbGVzIjpbImxpc3QiLCJnZXQiLCJkZWxldGUiLCJ1cGRhdGUiLCJjcmVhdGUiLCJtb2R1bGUiXSwic2VjdXJpdHktYWN0aW9ucyI6WyJsaXN0IiwiZ2V0IiwiY3JlYXRlIiwidXBkYXRlIiwiZGVsZXRlIiwibW9kdWxlIl0sInNlY3VyaXR5LXBvc2l0aW9ucyI6WyJsaXN0IiwiZ2V0IiwiZGVsZXRlIiwiY3JlYXRlIiwidXBkYXRlIiwibW9kdWxlIl0sInNlY3VyaXR5LXVzZXJzIjpbImxpc3QiLCJ1cGRhdGUiLCJjcmVhdGUiLCJnZXQiLCJkZWxldGUiLCJtb2R1bGUiXSwic2VjdXJpdHktcGVybWlzc2lvbnMiOlsibGlzdCIsImdldCIsImRlbGV0ZSIsInVwZGF0ZSIsImNyZWF0ZSIsIm1vZHVsZSJdLCJzZWN1cml0eS1tb2R1bGVzIjpbImxpc3QiLCJjcmVhdGUiLCJkZWxldGUiLCJnZXQiLCJ1cGRhdGUiLCJtb2R1bGUiXX0sIm1vZHVsZS1tYXJrZXRpbmciOnsibWFya2V0aW5nLW9mZmVycyI6WyJ1cGRhdGUiLCJnZXQiLCJjcmVhdGUiLCJkZWxldGUiLCJsaXN0IiwibW9kdWxlIl0sIm1hcmtldGluZy1wcm9tb3Rpb25hbGNvZGVzIjpbImxpc3QiLCJnZXQiLCJjcmVhdGUiLCJkZWxldGUiLCJ1cGRhdGUiLCJtb2R1bGUiXSwibWFya2V0aW5nLXByb2R1Y3QtdHJhbnNsYXRlIjpbImdldCIsImRlbGV0ZSIsInVwZGF0ZSIsImNyZWF0ZSIsImxpc3QiXSwibWFya2V0aW5nLXByb21vdGlvbmFsY29kZS10cmFuc2xhdGUiOlsiZ2V0IiwiZGVsZXRlIiwibGlzdCIsImNyZWF0ZSIsInVwZGF0ZSJdLCJtYXJrZXRpbmctcHJvZHVjdHMiOlsibGlzdCIsInVwZGF0ZSIsImdldCIsImNyZWF0ZSIsImRlbGV0ZSIsIm1vZHVsZSJdLCJtYXJrZXRpbmctY3VycmVuY2llcyI6WyJsaXN0IiwidXBkYXRlIiwiZ2V0IiwiZGVsZXRlIiwiY3JlYXRlIl0sIm1hcmtldGluZy1wcm9tb3Rpb25hbGNvZGUtdXNlIjpbImxpc3QiLCJnZXQiXSwibWFya2V0aW5nLW9mZmVyLXRyYW5zbGF0ZSI6WyJnZXQiLCJkZWxldGUiLCJ1cGRhdGUiLCJjcmVhdGUiLCJsaXN0Il0sIm1hcmtldGluZy1vcGVyYXRpb25zIjpbImdldCIsImRlbGV0ZSIsInVwZGF0ZSIsImNyZWF0ZSIsImxpc3QiXSwibWFya2V0aW5nLXBlcmlvZHMiOlsiZ2V0IiwiZGVsZXRlIiwibGlzdCIsImNyZWF0ZSIsInVwZGF0ZSJdLCJtYXJrZXRpbmctcGVyaW9kaWNpdGllcyI6WyJjcmVhdGUiLCJsaXN0IiwiZ2V0IiwidXBkYXRlIiwiZGVsZXRlIl0sIm1hcmtldGluZy1wcm9kdWN0LWNvdW50cmllcyI6WyJkZWxldGUiLCJnZXQiLCJsaXN0IiwiY3JlYXRlIiwidXBkYXRlIl0sIm1hcmtldGluZy1wYWNrYWdlLXRyYW5zbGF0ZSI6WyJkZWxldGUiLCJsaXN0IiwiY3JlYXRlIiwiZ2V0IiwidXBkYXRlIl0sIm1hcmtldGluZy1wYWNrYWdlcyI6WyJsaXN0IiwiZ2V0IiwidXBkYXRlIiwiZGVsZXRlIiwiY3JlYXRlIiwibW9kdWxlIl0sIm1hcmtldGluZy1wcm9kdWN0LXByaWNlcyI6WyJnZXQiLCJ1cGRhdGUiLCJsaXN0IiwiZGVsZXRlIiwiY3JlYXRlIl19LCJtb2R1bGUtY2hhcmdlcyI6eyJjaGFyZ2UtcGF5c3RhdGlvbnMiOlsiY3JlYXRlIiwibGlzdCIsImRlbGV0ZSIsImdldCIsInVwZGF0ZSIsIm1vZHVsZSJdLCJjaGFyZ2UtZXhjaGFuZ2UiOlsiY3JlYXRlIiwibGlzdCIsInVwZGF0ZSIsImdldCIsIm1vZHVsZSJdLCJjaGFyZ2UtbWFpbmNoYXJnZXMiOlsibGlzdCIsIm1vZHVsZSIsImdldCIsImNyZWF0ZSJdLCJjaGFyZ2UtY2hhcmdlcyI6WyJsaXN0IiwiY3JlYXRlIiwiZGVsZXRlIl19LCJtb2R1bGUtcGF5bWVudHMiOnt9LCJtb2R1bGUtaW50ZXJhY3Rpb25zIjp7ImludGVyYWN0aW9ucy1yZXBvcnRzIjpbImdldCIsImxpc3QiXSwiaW50ZXJhY3Rpb24tbWFpbnRlbmFuY2UiOlsibGlzdCIsImNyZWF0ZSIsInVwZGF0ZSIsImRlbGV0ZSIsImdldCJdLCJpbnRlcmFjdGlvbi1pbnRlcmFjdGlvbnMiOlsiZGVsZXRlIiwidXBkYXRlIiwiY3JlYXRlIiwiZ2V0IiwibGlzdCJdfSwibW9kdWxlLWNwYW5lbCI6eyJjcGFuZWwtY3BhbmVscyI6WyJsaXN0IiwidXBkYXRlIiwiY3JlYXRlIiwiZGVsZXRlIiwiZ2V0IiwibW9kdWxlIl0sImNwYW5lbC1vd25lcnMiOlsiY3JlYXRlIiwidXBkYXRlIiwiZGVsZXRlIiwibGlzdCIsImdldCJdLCJjcGFuZWwtaW5kaWNhdG9ycyI6WyJnZXQiLCJsaXN0IiwibW9kdWxlIl0sImNwYW5lbC1jbHVzdGVycyI6WyJ1cGRhdGUiLCJkZWxldGUiLCJjcmVhdGUiLCJnZXQiLCJsaXN0IiwibW9kdWxlIl0sImNwYW5lbC1yZWFzb25zIjpbImRlbGV0ZSIsInVwZGF0ZSIsImdldCIsImxpc3QiLCJjcmVhdGUiXSwiY3BhbmVsLXN0YXRlcyI6WyJnZXQiLCJkZWxldGUiLCJ1cGRhdGUiLCJsaXN0IiwiY3JlYXRlIl0sImNwYW5lbC1sb2dzIjpbImxpc3QiLCJtb2R1bGUiXSwiY3BhbmVsLXBhY2thZ2VzIjpbImxpc3QiLCJ1cGRhdGUiLCJjcmVhdGUiLCJkZWxldGUiLCJnZXQiLCJtb2R1bGUiXSwiY3BhbmVsLWFjY291bnRzIjpbImxpc3QiLCJ1cGRhdGUiLCJjcmVhdGUiLCJkZWxldGUiLCJnZXQiLCJtb2R1bGUiXSwiY3BhbmVsLXN0YXR1cyI6WyJ1cGRhdGUiLCJkZWxldGUiLCJnZXQiLCJjcmVhdGUiLCJsaXN0Il19LCJtb2R1bGUtcmVwb3J0cyI6e30sIm1vZHVsZS1wcmV2ZW50YSI6eyJwcmV2ZW50YS1tYWludGVuYW5jZXMiOlsibGlzdCIsImRlbGV0ZSIsImNyZWF0ZSIsInVwZGF0ZSIsIm1vZHVsZSJdLCJwcmV2ZW50YS1yZXBvcnRzIjpbImxpc3QiLCJ1cGRhdGUiLCJjcmVhdGUiLCJtb2R1bGUiXSwicHJldmVudGEtaW5kaWNhdG9ycyI6WyJsaXN0IiwibW9kdWxlIl19LCJtb2R1bGUtZG9tYWlucyI6eyJkb21haW4tdGxkcyI6WyJsaXN0IiwiZ2V0IiwiZGVsZXRlIiwidXBkYXRlIiwiY3JlYXRlIiwibW9kdWxlIl0sImRvbWFpbi1zbGRzIjpbImNyZWF0ZSIsImxpc3QiLCJkZWxldGUiLCJ1cGRhdGUiLCJnZXQiLCJtb2R1bGUiXSwiZG9tYWluLWRvbWFpbnMiOlsibGlzdCIsImRlbGV0ZSIsImdldCIsInVwZGF0ZSIsImNyZWF0ZSIsIm1vZHVsZSJdLCJkb21haW4tY29udGFjdHR5cGVzIjpbImxpc3QiXSwiZG9tYWluLW93bmVycyI6WyJsaXN0Il0sImRvbWFpbi1kbnNyZWNvcmR0eXBlcyI6WyJsaXN0Il0sImRvbWFpbi1wcm92aWRlcnMiOlsibGlzdCIsImNyZWF0ZSIsInVwZGF0ZSIsImdldCIsImRlbGV0ZSIsIm1vZHVsZSJdLCJkb21haW4tcmVhc29ucyI6WyJkZWxldGUiLCJjcmVhdGUiLCJ1cGRhdGUiLCJsaXN0IiwiZ2V0IiwibW9kdWxlIl0sImRvbWFpbi1sb2dzIjpbImxpc3QiLCJnZXQiLCJtb2R1bGUiXSwiZG9tYWluLXN0YXRlcyI6WyJsaXN0Il0sImRvbWFpbi1jb21wYW5pZXMiOlsibGlzdCJdLCJkb21haW4tc3Vib3JkaW5hdGVkbnMiOlsibGlzdCIsImNyZWF0ZSIsImRlbGV0ZSIsImdldCIsInVwZGF0ZSJdfX0sInVzZXIiOnsidXNlcm5hbWUiOiJhZG1pbiIsInN0YXR1cyI6InZhbGlkYXRlZCIsImZpcnN0TmFtZSI6IkFkbWluaXN0cmFkb3IiLCJsYXN0TmFtZSI6IkJhY2tvZmZpY2UiLCJlbWFpbCI6ImFkbWluQHJjcC5wZSIsImlkIjoiYWYzZjc2OTQtN2U3ZS00YjI0LWI1ZTMtMzFiZmE1ZTkxY2Q4In0sImV4cCI6MTUzMjIwOTE0MCwiaWF0IjoxNTMyMTIyNzQwfQ.h2rLsR1zVZK4lsyn09mGCylo1sVBldqNf_QDSbS0PR0';

const dir = './src/';

// Crea las carpetas y archivos.
function handleFile(err, data) {
  if (err) throw err;
  obj = JSON.parse(data, null, 2);
  for (let index = 0; index < obj.length; index++) {
    const element = obj[index];
    const divider = element.split('/api/v1/')[1];
    const option = {
      uri: element,
      headers: {
        'content-type': 'application/json',
        Authorization: token
      }
    };
    if (divider != undefined) {
      const create = divider;
      const folderName = create.split('/')[0];
      const folder = folderName;
      const file = folder + '-item-get.json';
      // console.log(folder);

      if (!fs.existsSync(dir + folder)) {
        fs.mkdirSync(dir + folder);
        requestFunction(option, element, dir, folder, file);
        console.log('=== Creando carpeta ===> ', folder);
      } else {
        if (!fs.existsSync(dir + folder + '/' + file)) {
          console.log('=== Creando Archivo ===> ', file);
          requestFunction(option, element, dir, folder, file);
        }
      }
    } else {
      console.log('=== problemas ===>', element);
    }
  }
}
const requestFunction = (option, element, dir, folder, file) => {
  request(option, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      // const result = JSON.stringify(JSON.parse(body))

      const snapshot = JSON.parse(body).results
        ? JSON.parse(body).results[0]
        : null;

      const id = snapshot ? snapshot.id : null;
      // console.log(id, folder);
      // const id = JSON.parse(body).results[0].id;
      if (id) {
        const option2 = {
          uri: element + '/' + id,
          headers: {
            'content-type': 'application/json',
            Authorization: token
          }
        };
        request(option2, (error, response, bodyChild) => {
          if (!error && response.statusCode == 200) {
            fs.writeFileSync(dir + folder + '/' + file, bodyChild);
            // console.log('body:', JSON.stringify(JSON.parse(body), null, 2)); // Print the HTML for the Google homepage.
          } else {
            // console.log(response.statusCode, error, folder);
            console.log('=== Sin Metodo GET_ID ===> ', folder);
          }
        });
      }
      //   fs.writeFileSync(dir + folder + '/' + file, body);
      // console.log('body:', JSON.stringify(JSON.parse(body), null, 2)); // Print the HTML for the Google homepage.
    } else {
      console.log(response.statusCode, error);
    }
  });
};

// Corre todo el script
fs.readFile('./url.json', handleFile);
