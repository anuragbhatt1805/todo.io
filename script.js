// Setting default time
window.onload = function() {
    let tmp = new Date(Date.now());
    let dateInputFormatted = tmp.toLocaleString().split(',')[1];
    document.getElementById('time').value = dateInputFormatted.substring(1, 6);
};


// Handling Data from User
let form_data = document.getElementById('data');

function handleform(event) {

    event.preventDefault();
    let ls_data = JSON.parse(localStorage.getItem('todo-data')) || {
        length: 0,
        data:[]
    };

    let title = document.getElementById('title').value;
    let info = document.getElementById('info').value;
    let time = document.getElementById('time').value;

    let obj = {
        id: ls_data.length+1,
        title: title,
        info: info,
        time: time
    };

    ls_data.length++;
    ls_data.data.push(obj);
    localStorage.setItem('todo-data', JSON.stringify(ls_data));
    display_data();
}
form_data.addEventListener('submit', handleform);


// Deleting record
function delete_record(id) {
    let data = JSON.parse(localStorage.getItem('todo-data')) || {
        data:[]
    };
    let tmp;
    for (let i = 0; i < data.data.length; i++) {
        if (data.data[i].id == id){
            tmp = data.data[i];
            data.data.splice(i, 1);
            break;
        }
    }
    alert(`Data with Title: ${tmp.title} id deleted`)
    localStorage.setItem('todo-data', JSON.stringify(data));
    display_data();
}


// Display Data in Table

function display_data(){
    let listdata = JSON.parse(localStorage.getItem('todo-data')) || {
        length: 0,
        data:[]
    };

    let table = document.getElementsByTagName('tbody')[0];
    table.innerHTML = null;
    for (let i = 1; i <= listdata.length; i++) {
        let trow = document.createElement('tr'); // Create a new row

        let td1 = document.createElement('th'); // Add Column
        td1.setAttribute('scope', "row");
        td1.innerText = i;
        trow.appendChild(td1);

        let td2 = document.createElement('td'); // Add title
        td2.innerText = listdata.data[i-1].title;
        trow.appendChild(td2);

        let td3 = document.createElement('td'); // Add Infor
        td3.innerText = listdata.data[i-1].info;
        trow.appendChild(td3);

        let td5 = document.createElement('td'); // Add Time
        td5.innerText = listdata.data[i-1].time;
        trow.appendChild(td5);

        let td4 = document.createElement('td'); // Add delete Button
        let button = document.createElement('button');
        button.setAttribute('type', 'button');
        button.setAttribute('class', 'btn btn-danger');
        button.setAttribute('onClick', `delete_record(${listdata.data[i-1].id})`);
        button.innerText = "Delete"
        td4.appendChild(button);
        trow.appendChild(td4);
        table.appendChild(trow);
    }
}
