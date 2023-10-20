document.addEventListener('DOMContentLoaded', () => {
  require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs' } });

  require(['vs/editor/editor.main'], () => {
    // Initialize the input editor
    const editor = monaco.editor.create(document.getElementById('editor'), {
      value: `// find Factorial of n
let n = 5;
function fact(n) {
  if (n == 0) return 1;
  return n * fact(n - 1);
}  
console.log(fact(n))

//  find nth fibonacchi of n
function fib(n) {
  if (n == 1 || n == 0) return n;
  return fib(n - 1) + fib(n - 2);
}
console.log(fib(n))`,

      language: 'javascript',
      theme: 'vs-dark',
    });

    // Initialize the output editor
    const outputEditor = monaco.editor.create(document.getElementById('outputEditor'), {
      value: '',
      language: 'javascript', // Set the appropriate language for the output
      theme: 'vs-dark',
      readOnly: true, // Make the output editor read-only
    });

    const targetLanguage = document.getElementById('targetLanguage');
    const convertButton = document.getElementById('convertButton');
    const degubButton = document.getElementById('degubButton');
    const qualityCheckButton = document.getElementById('qualityCheckButton');
    const baseUrl = `https://zany-shirt-elk.cyclic.app`//`http://localhost:3000`
    convertButton.addEventListener('click', async () => {
      const code = editor.getValue(); // Get code from the input editor
      const selectedLanguage = targetLanguage.value;

      const response = await fetch(`${baseUrl}/api/codeConversion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, targetLanguage: selectedLanguage }),
      });

      if (response.ok) {
        const data = await response.json();
        // Set the converted code in the output editor
        outputEditor.setValue(data.convertedCode);
      } else {
        outputEditor.setValue('Conversion failed. Please try again.');
      }
    });

    degubButton.addEventListener('click', async () => {
      const code = editor.getValue(); // Get code from the input editor
      // const selectedLanguage = targetLanguage.value;

      const response = await fetch(`${baseUrl}/api/codeDebugging`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (response.ok) {
        const data = await response.json();
        // Set the converted code in the output editor
        outputEditor.setValue(data.convertedCode);
      } else {
        outputEditor.setValue('Conversion failed. Please try again.');
      }
    });

    qualityCheckButton.addEventListener('click', async () => {
      const code = editor.getValue(); // Get code from the input editor
      // const selectedLanguage = targetLanguage.value;

      const response = await fetch(`${baseUrl}/api/codeQualityCheck`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (response.ok) {
        const data = await response.json();
        // Set the converted code in the output editor
        outputEditor.setValue(data.convertedCode);
      } else {
        outputEditor.setValue('Conversion failed. Please try again.');
      }
    });
  });
});


let n = 5;

function fact(n) {
  if (n == 0) return 1;
  return n * fact(n - 1);
}

fact(n)