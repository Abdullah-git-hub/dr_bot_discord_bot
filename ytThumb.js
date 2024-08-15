function getThumb(ytLink) {
  let data = ytLink;
  if (data.indexOf("watch?") != -1 && data.indexOf("youtube.com") != -1) {

    let n = data.indexOf("watch") + 8
    // console.log(data.slice(n,(n+11)))
    return (`https://img.youtube.com/vi/${data.slice(n, (n + 11))}/maxresdefault.jpg`);

  } else if (data.indexOf("embed/") != -1 && data.indexOf("youtube.com") != -1) {

    let n = data.indexOf("embed") + 6
    return (`https://img.youtube.com/vi/${data.slice(n, (n + 11))}/maxresdefault.jpg`);

  } else if (data.indexOf("embed/") == -1 && data.indexOf("watch?") == -1 && data.indexOf("youtu.be/") != -1) {

    let n = data.indexOf("youtu.be/") + 9
    return (`https://img.youtube.com/vi/${data.slice(n, (n + 11))}/maxresdefault.jpg, https://i.ytimg.com/vi/${data.slice(n, (n + 11))}/maxresdefault.jpg`);

  } else {
    return ("https://img.freepik.com/free-vector/404-error-with-person-looking-concept-illustration_114360-7912.jpg?w=996&t=st=1660403083~exp=1660403683~hmac=fac557d2d81ce476a5652dd58973d2ffdba37990471ded4851084b52f3b9649f");
  }
}

module.exports = { getThumb }