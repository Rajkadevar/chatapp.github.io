vld()
{
    const name1 = prompt("enter your name ! max size of name is 6");
    if (name1 == "") {
        alert("it is empty")
        vld();
    } else if (name1.length > 6) {
        alert("out of length")
        vld();
    } else {
        module.export =name1;
    }
}