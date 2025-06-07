const take_input = document.getElementById('todo-input');
const add_input = document.getElementById('add-todo-input');
const show_input = document.getElementById('fetch-here');

add_input.addEventListener('click', () =>{

    const value = take_input.value;
    console.log("user entered value", value);

    const div = document.createElement('div');
    div.innerText = value;

    show_input.appendChild(div);
    take_input.value=''
});