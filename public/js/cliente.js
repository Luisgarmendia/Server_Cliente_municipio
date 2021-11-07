$(()=>{
    ///inicializar datatable
    $('#tablaClientes').DataTable({
        "language": {
            "url": "/DataTables/Spanish.json"
        }
    });

    setTimeout(()=>{
        $('#alert').fadeOut(1500,()=>{
            $('#alert').remove();
        });
    },3000);
    
});


EditarCliente = cliente => {
    console.log(cliente);
    $('#Nombre').val(cliente.Nombre);
    $('#Apellido').val(cliente.Apellido);
    $('#Direccion').val(cliente.Direccion);
    $('#Telefono').val(cliente.Telefono);
    $('#CodMunicipio').children().map((index, element)=>{
        $(element).removeAttr('selected');
        if($(element).val() == cliente.CodMunicipio){
            $(element).attr('selected', 'selected');
        }
    });
    
    $('#TitleForm').html('Editar Cliente');
    $('#btnGuardar').html('Editar');
    $('#btnCancelar').css('display', 'inline');
    $('#formCliente').attr('action', `/clientes/update/${cliente.Id}`);
}

    
getbyId = id => {
    $.ajax({
        url: `/clientes/${id}`,
        method: 'get',
        dataType: 'json',
        success: function(data){
            EditarCliente(data);
        }
    });
}

cancelar = () => {
    $('#Nombre').val('');
    $('#Apellido').val('');
    $('#Direccion').val('');
    $('#Telefono').val('');
    $('#TitleForm').html('Nuevo Cliente');
    $('#btnGuardar').html('Guardar');
    $('#btnCancelar').css('display', 'none');
    $('#formCliente').attr('action', '/clientes');
}