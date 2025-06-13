import { Request, Response } from 'express';

export const hello = (req: Request, res: Response): void => {
  res
    .send(
      `
    <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <p id="message">Message:</p>
    <br />
    <button id="btn1">Fetch</button>
    <br />
    <br />
    <button id="btn2">Fetch</button>
  </body>
   <script>
    const button1 = document.getElementById("btn1");
    const button2 = document.getElementById("btn2");
    const message = document.getElementById("message");

    const data = {
      email: "tush2149@gmail.com",
      password: "tushar1234",
    };

    async function getData() {
      const res = await fetch("http://localhost:8000/user/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      result = await res.json();
      return result;
    }

    async function hello() {
      const res = await fetch("http://localhost:8000/hello", {
        method: "GET",
      });
      result = await res.json();
      return result;
    }

    // function setCookie(cname, cvalue, exdays) {
    //   const d = new Date();
    //   d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    //   let expires = "expires=" + d.toUTCString();
    //   document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    // }

    // function getCookie(cname) {
    //   const name = cname + "=";
    //   const decodedCookie = decodeURIComponent(document.cookie);
    //   console.log("decoded: ", decodedCookie);
    //   const cookies = decodedCookie.split(";");
    //   for (let i = 0; i < cookies.length; i++) {
    //     let c = cookies[i].trim();
    //     if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
    //   }
    //   return null;
    // }

    button1.addEventListener("click", async () => {
      const res = await getData();
      //   setCookie("token", res.token, 2);
      //   let cookie = getCookie("token");
      //  console.log(cookie);
      message.innerText = res.token;
    });

    button2.addEventListener("click", async () => {
      const res = await hello();
      console.log(res);
      message.innerText = res.message;
    });
  </script>

  </html>
    `,
    )
    .redirect('/home');
};
