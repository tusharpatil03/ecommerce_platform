import { useState } from "react";
interface SignUpData {
  email: string;
  password: string;
}

function SignUp() {
  const [formData, setFormData] = useState<SignUpData>({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async () => {
    const res = await getData(formData);
    console.log(res);
  };

  async function getData(data: SignUpData) {
    const res = await fetch("http://localhost:8000/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  }

  return (
    <>
      <div style={{ padding: "10px" }}>
        <form onSubmit={handleSubmit}>
          <label>Email</label> <br></br>
          <input type="text" name="email" onChange={handleChange}></input>
          <br />
          <label>Password</label> <br></br>
          <input
            type="password"
            name="password"
            onChange={handleChange}
          ></input>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default SignUp;
