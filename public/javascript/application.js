$(document).ready(function() {

  var contacts = {};

  var arrayToMapById = function(arr){
    var output = {};
    for (var i = 0; i<arr.length; i++){
      output[arr[i].id] = arr[i];
    }
    return output;
  }

  $.ajax('/contacts').done(function(data){
    contacts = arrayToMapById(data);
    _.each(data, renderContact);
  });

  var serializeArrayToObject = function(arr){
    var output = {};
    for (var i = 0; i<arr.length; i++){
      output[arr[i].name] = arr[i].value;
    }
    return output;
  }

  var renderContact = function(contact){
        $('<div class="contact"></div>')
          .append($('<span>' + contact.first_name + " " + contact.last_name + '</span>'))
          .attr('data-id', contact.id)
          .appendTo($('.container'));
      };
 
  var showContactInDetailView = function(id){
    var contact = contacts[id]
    $('.details').append('<p>' + contact.first_name + "   " + contact.last_name + "   " + 
        contact.email + "   " + contact.phone_number + '</p>' + "  " + '<span data-id='+contact.id+' class="delete">Delete</span>');
  };



//Listens for click on the contact in order to display details
  $('.container').on('click','.contact', function(){
    $('.details').empty();
    showContactInDetailView($(this).attr('data-id'))
  });

//Listens for the delete Contact event
 $('.details').on('click', '.delete', function (){
    var id = $(this).attr('data-id');
    $.ajax({url: 'contacts/' + id, method: 'DELETE'});
    $('.details').empty();
    $('.contact[data-id='+id+']').remove();
 }) 

//Listens for clicks on add new contact and displays form
 $('.add-new').on('click', function (e){
      $(e.target).after("<form class='add-contact'>\
        <input name='first_name' placeholder='First Name'/>\
        <input name ='last_name' placeholder='Last Name'/>\
        <input name='email' placeholder='Email'/><input name='phone_number' placeholder='Phone no.'/>\
        <button type='submit' class='submit'>Create</button></form>")
    });

//Listens for submit on the form create button and calls ajax request to post new contact
  $('body').on('click', '.submit', function(e){
    var contactInfo = $('form.add-contact').serialize();
    var jsonContact = $('form.add-contact').serializeArray();
    jsonContact = serializeArrayToObject(jsonContact);
    renderContact(jsonContact);
    e.preventDefault();
    $.ajax({url: '/contacts',
      method: 'post',
      data: contactInfo});
    $('form.add-contact').remove();
  });

});
