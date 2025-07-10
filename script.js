let shareCount = 0;
const shareBtn = document.getElementById("shareBtn");
const shareCountText = document.getElementById("shareCount");
const form = document.getElementById("registrationForm");
const submitBtn = document.getElementById("submitBtn");
const successMsg = document.getElementById("successMsg");

shareBtn.addEventListener("click", () => {
  if (shareCount < 5) {
    shareCount++;
    const message = encodeURIComponent("Hey Buddy, Join Tech For Girls Community!");
    const url = `https://wa.me/?text=${message}`;
    window.open(url, "_blank");
    shareCountText.innerText = `Click count: ${shareCount}/5`;
    if (shareCount === 5) {
      alert("Sharing complete. Please continue with registration.");
    }
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (shareCount < 5) {
    alert("Please complete sharing 5 times before submitting.");
    return;
  }

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const college = document.getElementById("college").value;
  const file = document.getElementById("screenshot").files[0];

  if (!file) {
    alert("Please upload a screenshot.");
    return;
  }

  const reader = new FileReader();
  reader.onloadend = async function () {
    const base64String = reader.result.split(",")[1];
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("college", college);
    formData.append("screenshot", base64String);

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbyuyGeeIKcFhI9aGBK_sfIGwksJrS3e6l9OVYqkR_jNQVd4QWmAW7DtogtfxCzt6SyS/exec", {
        method: "POST",
        body: formData,
      });
      const result = await response.text();
      if (result === "Success") {
        disableForm();
        successMsg.classList.remove("hidden");
      } else {
        alert("Error submitting form. Try again.");
      }
    } catch (err) {
      alert("Submission failed: " + err.message);
    }
  };
  reader.readAsDataURL(file);
});

function disableForm() {
  document.querySelectorAll("input, button").forEach((el) => {
    el.disabled = true;
  });
}
