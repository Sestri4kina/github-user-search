'use strict';

var defaultUser = 'Sestri4kina';
var userAPIUrl = 'https://api.github.com/users/' + defaultUser;

var githubUserBlock = document.getElementById('github_user');
var input = document.getElementById('get_user');
var search = document.getElementById('user_submit');

var createNode = function createNode(element) {
  return document.createElement(element);
};
var append = function append(parent, el) {
  return parent.appendChild(el);
};

var fetchGitUser = function fetchGitUser(url) {
  input.focus();
  fetch(url).then(function (resp) {
    return resp.json();
  }).then(function (data) {
    var user = data;

    var wrapper = createNode('div'),
        content = createNode('div'),
        title = createNode('h3'),
        img = createNode('img'),
        link = createNode('a'),
        info = createNode('p'),
        warning = createNode('div');

    if (user.message == "Not Found") {
      input.focus();
      githubUserBlock.innerHTML = '';

      warning.innerHTML = "This user was not found! Try something else.";
      warning.classList.add('alert', 'alert-danger');

      append(githubUserBlock, warning);
      return;
    }

    title.innerHTML = user.login;
    link.href = user.html_url;
    link.setAttribute('target', '_blank');
    img.src = user.avatar_url;
    info.innerHTML = user.bio;

    wrapper.classList.add('media-left');
    img.classList.add('media');
    content.classList.add('media-body');
    title.classList.add('media-heading');

    append(githubUserBlock, link);
    append(link, wrapper);
    append(link, content);
    append(wrapper, img);
    append(content, title);
    append(content, info);
  }).catch(function (error) {
    console.log(error);
  });
};

var searchUser = function searchUser() {
  var value = input.value;
  var url = 'https://api.github.com/users/' + value;

  input.value = '';
  githubUserBlock.innerHTML = '';
  fetchGitUser(url);
};

search.addEventListener('click', searchUser);
input.addEventListener('keyup', function (e) {
  if (e.keyCode == 13) {
    searchUser();
  }
});

fetchGitUser(userAPIUrl);