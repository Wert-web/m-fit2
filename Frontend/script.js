document.addEventListener('DOMContentLoaded', function () {
    // Código para manejar la tabla
    var myArray = [];

    function buildTable(data) {
        var table = document.getElementById('myTable');
        if (!table) {
            console.error("No se encontró el elemento con ID 'myTable'.");
            return;
        }

        var rows = '';
        for (var i = 0; i < data.length; i++) {
            rows += `
                <tr>
                    <td><input type="checkbox"></td>
                    <td>${data[i].firtContent || "N/A"}</td>
                    <td>${data[i].secondContent || "Sin descripción"}</td>
                    <td>${data[i].teirdContent || "Sin fecha"}</td>
                    <td>${data[i].fourContent || "0"}</td>
                    <td><button>${data[i].fiveContent}</button></td>
                </tr>`;
        }
        table.innerHTML = rows;
    }

    $.ajax({
        method: 'GET',
        url:'fetch_data.php',
        succes:function(response){
            myArray = response.data
            buildTable
            console.log(myArray)
        }
    })

    buildTable(myArray);

    // Código para manejar el botón toggle
    document.getElementById('toggle-btn').addEventListener('click', function () {
        const itemList = document.getElementById('itemlist');
        if (!itemList) {
            console.error("No se encontró el elemento con ID 'itemlist'.");
            return;
        }

        if (itemList.style.display === 'none' || itemList.style.display === '') {
            itemList.style.display = 'block';
            this.textContent = 'Ocultar Lista';
        } else {
            itemList.style.display = 'none';
            this.textContent = 'Mostrar Lista';
        }
    });
});
