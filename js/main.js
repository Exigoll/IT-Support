// Скрывающееся меню в tasks
let coll = document.getElementsByClassName('collapsible');
for (let i = 0; i < coll.length; i++) {
  coll[i].addEventListener('click', function() {
    this.classList.toggle('active');
    let content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight =content.scrollHeight + 'px';
    }
  })
}
let users = [
  {id: 1, name: 'Andrew'},
  {id: 2, name: 'John'},
  {id: 3, name: 'Mike'},
  ]

let user = users.find(item => item.id == 1)
console.log(user.name) // Andrew