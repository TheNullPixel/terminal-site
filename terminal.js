// Element references
var before = document.getElementById("before");
var liner = document.getElementById("liner");
var command = document.getElementById("typer");
var textarea = document.getElementById("texter");
var terminal = document.getElementById("terminal");
var cursor;

// Data variables
var git = 0;
var commands = [];
var twitter = "https://www.twitter.com/nullpixeldev/";
var github = "https://github.com/null-pixel-dev/";
var email = "mailto:nullpixeldev@proton.me";

// Static content
var about = [
  "<br>",
  "Hey there, I'm Null Pixel!👋",
  "I'm a frontend developer from Belfast, UK. I'm a final year",
  "Software Engineering student at Queen's University Belfast,",
  "also working part time as a placement engineer at DailyPay.",
  "<br>",
];

var social = [
  "<br>",
  'twitter        <a href="' + twitter + '" target="_blank">twitter/nullpixeldev</a>',
  'github         <a href="' + github + '" target="_blank">github/null-pixel-dev</a>',
  "<br>",
];

var projects = [
  "<br>",
  "Coming soon!",
  "<br>",
];

var help = [
  "<br>",
  '<span class="command">about</span>          Who is Null Pixel?',
  '<span class="command">social</span>         Display social networks',
  '<span class="command">projects</span>       View project portfolio',
  '<span class="command">history</span>        View command history',
  '<span class="command">help</span>           Display a list of available commands',
  '<span class="command">email</span>          Get in contact with me',
  '<span class="command">clear</span>          Clear terminal',
  '<span class="command">banner</span>         Display the header',
  "<br>",
];

var banner = [
  '<span class="index">Null Pixel (null-pixel-dev). All pixels nullified.</span>',
  "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
  '<span class="accent">Welcome to my terminal website.</span>',
  '<span class="accent">For a list of available commands, type</span> <span class="command">\'help\'</span><span class="accent">.</span>',
];

setTimeout(function () {
  loopLines(banner, "", 80);
  textarea.focus();
}, 100);

window.addEventListener("keyup", enterKey);

textarea.value = "";
command.innerHTML = textarea.value;

function enterKey(e) {
  if (e.keyCode == 181) {
    document.location.reload(true);
  }
  if (e.keyCode == 13) {
    commands.push(command.innerHTML);
    git = commands.length;
    addLine(
      "user@null-pixel-dev:~$ " + command.innerHTML,
      "no-animation",
      0
    );
    commander(command.innerHTML.toLowerCase());
    command.innerHTML = "";
    textarea.value = "";
  }
  if (e.keyCode == 38 && git != 0) {
    git -= 1;
    textarea.value = commands[git];
    command.innerHTML = textarea.value;
  }
  if (e.keyCode == 40 && git != commands.length) {
    git += 1;
    if (commands[git] === undefined) {
      textarea.value = "";
    } else {
      textarea.value = commands[git];
    }
    command.innerHTML = textarea.value;
  }
}

function commander(cmd) {
  switch (cmd.toLowerCase()) {
    case "help":
      loopLines(help, "accent margin", 80);
      break;
    case "about":
      loopLines(about, "accent margin", 80);
      break;
    case "social":
      loopLines(social, "accent margin", 80);
      break;
    case "projects":
      loopLines(projects, "accent margin", 80);
      break;
    case "history":
      addLine("<br>", "", 0);
      loopLines(commands, "accent", 80);
      addLine("<br>", "command", 80 * commands.length + 50);
      break;
    case "email":
      addLine(
        'Opening mailto:<a href="mailto:nullpixeldev@proton.me">nullpixeldev@proton.me</a>...',
        "accent",
        80
      );
      newTab(email);
      break;
    case "clear":
      setTimeout(function () {
        terminal.innerHTML = '<a id="before"></a>';
        before = document.getElementById("before");
      }, 1);
      break;
    case "banner":
      loopLines(banner, "", 80);
      break;
    // socials
    case "twitter":
      addLine("Opening Twitter...", "accent", 0);
      newTab(twitter);
      break;
    case "github":
      addLine("Opening GitHub...", "accent", 0);
      newTab(github);
      break;
    default:
      addLine(
        '<span class="inherit">Command not found. For a list of commands, type <span class="command">\'help\'</span>.</span>',
        "error",
        100
      );
      break;
  }
}

function newTab(link) {
  setTimeout(function () {
    window.open(link, "_blank");
  }, 500);
}

function addLine(text, style, time) {
  var t = "";
  for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) == " " && text.charAt(i + 1) == " ") {
      t += "&nbsp;&nbsp;";
      i++;
    } else {
      t += text.charAt(i);
    }
  }
  setTimeout(function () {
    var next = document.createElement("p");
    next.innerHTML = t;
    next.className = style;

    before.parentNode.insertBefore(next, before);

    window.scrollTo(0, document.body.offsetHeight);
  }, time);
}

function loopLines(name, style, time) {
  name.forEach(function (item, index) {
    addLine(item, style, index * time);
  });
}


function $(elid) {
  return document.getElementById(elid);
}


window.onload = init;

function init() {
  cursor = $("cursor");
  cursor.style.left = "0px";
}

function nl2br(txt) {
  return txt.replace(/\n/g, "");
}

function typeIt(from, e) {
  e = e || window;
  var w = $("typer");
  var tw = from.value;
  w.innerHTML = nl2br(tw);
}

function moveIt(count, e) {
  e = e || window;
  var keycode = e.keyCode || e.which;
  if (keycode == 37 && parseInt(cursor.style.left) >= 0 - (count - 1) * 10) {
    cursor.style.left = parseInt(cursor.style.left) - 10 + "px";
  } else if (keycode == 39 && parseInt(cursor.style.left) + 10 <= 0) {
    cursor.style.left = parseInt(cursor.style.left) + 10 + "px";
  }
}
