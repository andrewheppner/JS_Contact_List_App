$(document).ready(function() {

  var contacts = [];
  var renderContact = function(contact){
        $('<div class="contact"></div>')
          .append($('<span>' + contact.first_name + " " + contact.last_name + '</span>'))
          .attr('data-id', contact.id)
          .appendTo($('.container'));
      };
 
  var showContactInDetailView = function(id){
    var contact = contacts[id-1]
    $('.details').append('<p>' + contact.first_name + "   " + contact.last_name + "   " + 
        contact.email + "   " + contact.phone_number + '</p>' + "  " + '<span data-id='+contact.id+' class="delete">Delete</span>');
  };

  $('h1').on('click', function(){
    $.ajax('/contacts').done(function(data){
      contacts = data;
      _.each(data, renderContact);
    });
  });

  $('.container').on('click','.contact', function(){
    $('.details').empty();
    showContactInDetailView($(this).attr('data-id'))
  });

 $('.details').on('click', '.delete', function (){
    var id = $(this).attr('data-id');
    $.ajax({url: 'contacts/' + id, method: 'DELETE'});
    $('.details').empty();
   
    $('.contact[data-id='+id+']').remove();
 }) 


});
