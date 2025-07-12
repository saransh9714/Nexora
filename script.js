const analyzeBtn = document.getElementById('analyzeBtn');
const output = document.getElementById('output');
const spinner = document.getElementById('spinner');

analyzeBtn.addEventListener('click', async () => {
  const fileInput = document.getElementById('logFile');
  output.innerText = "";
  spinner.classList.remove('hidden');

  if (!fileInput.files[0]) {
    spinner.classList.add('hidden');
    output.innerText = "Please upload a log file.";
    return;
  }

  const reader = new FileReader();
  reader.onload = async function () {
    const logText = reader.result;

    try {
      const response = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logText }),
      });

      const data = await response.json();
      spinner.classList.add('hidden');

      if (data.result) {
        output.innerText = data.result;
      } else {
        output.innerText = "Error from server.";
      }
    } catch (err) {
      spinner.classList.add('hidden');
      output.innerText = "Error: " + err.message;
    }
  };
  reader.readAsText(fileInput.files[0]);
});
