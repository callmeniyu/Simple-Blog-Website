const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const posts = [];

const startingContent = "Viverra ipsum nunc aliquet bibendum enim facilisis gravida neque convallis. In hac habitasse platea dictumst vestibulum rhoncus. Est lorem ipsum dolor sit amet consectetur. Lacinia at quis risus sed vulputate odio ut enim blandit. Adipiscing at in tellus integer feugiat scelerisque varius. Facilisis sed odio morbi quis. Morbi non arcu risus quis varius quam quisque id diam. In arcu cursus euismod quis viverra nibh cras pulvinar mattis. Non diam phasellus vestibulum lorem sed. Tempus egestas sed sed risus. Lectus sit amet est placerat. Sit amet nulla facilisi morbi tempus iaculis urna id. Laoreet sit amet cursus sit amet dic";
const aboutContent = "Quis varius quam quisque id diam vel quam elementum pulvinar. Ac orci phasellus egestas tellus rutrum tellus pellentesque eu. Aenean euismod elementum nisi quis eleifend quam adipiscing. Enim neque volutpat ac tincidunt vitae. Tincidunt vitae semper quis lectus nulla at volutpat diam. Magnis dis parturient montes nascetur ridiculus mus. Suspendisse in est ante in nibh. Eu lobortis elementum nibh tellus molestie nunc non. Ele";
const contactContent = "Habitant morbi tristique senectus et netus. Pellentesque diam volutpat commodo sed egestas egestas. Sed adipiscing diam donec adipiscing tristique risus nec feugiat. Ultricies mi quis hendrerit dolor magna. Rhoncus dolor purus non enim praesent elementum. Purus faucibus ornare suspendisse sed nisi lacus sed viverra tellus. Faucibus scelerisque eleifend donec pretium vulputate sapien nec sagitti";

app.get("/", function (req, res) {
    res.render("home", {
        startingContent: startingContent,
        posts:posts
    });
});
app.get("/about", function (req, res) {
    res.render("about", { aboutContent: aboutContent });
});
app.get("/contact", function (req, res) {
    res.render("contact", { contactContent: contactContent });
});
app.get("/compose", function (req, res) {
    res.render("compose");
})
app.get("/:searchkey", function (req, res) {
    const requestedTitle = _.lowerCase(req.params.searchkey);
    posts.forEach(function (post) {
        const storedTitle = _.lowerCase(post.title)
        if (requestedTitle === storedTitle) {
            res.render("posts", {
                storedTitle: post.title,
                postContent: post.content
            })
        }
    })
})

app.post("/compose", function (req, res) {
    const post = {
        title: _.upperFirst(req.body.composeTitle),
        content: req.body.composeContent,
    }
    posts.push(post);
    res.redirect("/");
})







app.listen(3000, function () {
    console.log("Server is running at local port 3000");
})