// https://changer9000.vercel.app


const inputs = document.querySelectorAll('.controls input'); // Node-List

function handleUpdate() {

    const suffix = this.dataset.sizing || '';

    // target :root with documentElement (basically html)
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);

}

inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));