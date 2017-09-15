$(document).ready(function () {
  $('.deleteCustomer').on('click', deleteCustomer)
})

function deleteCustomer () {
  let confirmation = confirm('Are you sure?')
  if(confirmation){
    $.ajax({
      method: 'DELETE',
       url: 'users/delete/' + $(this).data('id')
    }).done(function (response) {
      window.location.replace('/')
    })
    window.location.replace('/')
  }else{
    return false
  }
}