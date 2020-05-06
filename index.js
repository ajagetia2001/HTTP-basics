const http=require('http');
const hostname='localhost';
const fs = require('fs');
const path=require('path');
const port=3000;
const server=http.createServer((req,res)=>{
    console.log('request for '+ req.url+" by method "+req.method);
    if(req.method=='GET'){
        var fileUrl;
        if(req.url=='/') fileUrl='/index.html';
        else fileUrl=req.url;
        var filePath = path.resolve('./public'+fileUrl);
        const fileExt = path.extname(filePath);
        if(fileExt == '.html'){
            fs.exists(filePath,(exists)=>{
                if(!exists){
                    res.statusCode=404;
                    res.setHeader('content-type','text/html');
                    res.end('<html><body>ERROR 404 '+ fileUrl + " file not found</body></html>");
                    return;
                }
                res.statusCode = 200;
                res.setHeader('content-type','text/html');
                res.end('<html><body>file '+ fileUrl+' found sucessfully</body></html>');
            });
        }
        else{
            res.statusCode = 404;
            res.setHeader('content-type','text/html');
            res.end('<html><body>ERROR 404 '+fileUrl +' is not a html file</body></html>');
        }
    }
    else{
        res.statusCode=404;
        res.setHeader('content-type','text/html');
        res.end('<html><body>ERROR 404'+fileUrl+' need a get request</body></html>');
    }
})
server.listen(port,hostname,()=>{
    console.log(`server started running at http://${hostname}:${port}`);
})