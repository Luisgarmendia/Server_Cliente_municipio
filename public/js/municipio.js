var marker;
var map;
$(()=>{
    initMap();
    setTimeout(()=>{
        $('#alert').fadeOut(1500,()=>{
            $('#alert').remove();
        });
    },3000);
});


function initMap() {
    // The location of Uluru
    mapboxgl.accessToken = 'pk.eyJ1IjoibHVpc2dhciIsImEiOiJja3JpMGhobG4weWVpMzBwNmg4YWR5am5sIn0.WCXsN1ChIlctGwHq5MO1wA';
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [14.6444874,-87.4015916],
        
    });
    marker = new mapboxgl.Marker({
        draggable: true
    })
    map.on("click",(e)=>{
        ///limpiar el mapa
        marker.remove();
        marker = new mapboxgl.Marker({draggable: true})
        .setLngLat([e.lngLat.lng, e.lngLat.lat])
        .addTo(map);
        $("#Latitud").val(e.lngLat.lat);
        $("#Longitud").val(e.lngLat.lng);
    });
}
function getbyId(id){
    $.ajax({
        url:`/municipios/${id}`,
        method:"GET",
        dataType:"json",
        success:function(data){
            $("#Municipio").val(data.Municipio);
            $("#Cabecera").val(data.Cabecera);
            $("#Latitud").val(data.Latitud);
            $("#Longitud").val(data.Longitud);
            $('#btnGuardar').html('Editar');
            $('#btnCancelar').css('display', 'inline');
            $('#TitleForm').html('Editar Municipio');
            $('#formMunicipio').attr('action', `/municipios/update/${data.CodMun}`);
            
            marker.remove();
            marker = new mapboxgl.Marker({draggable: true})
            .setLngLat([Number(data.Longitud), Number(data.Latitud)])
            .addTo(map);
        }
    });
}

function cancelar(){
    $('#btnGuardar').html('Guardar');
    $('#btnCancelar').css('display', 'none');
    $('#formCliente').attr('action', `/municipios`);
    $("#Municipio").val('');
    $("#Cabecera").val('');
    $("#Latitud").val('');
    $("#Longitud").val('');
    $('#TitleForm').html('Nuevo Municipio');
}