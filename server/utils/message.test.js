var expect = require('expect');
var {generateMessage} = require('./message');
var {generateLocationMessage} = require('./message');

describe('generateMessage',()=>{
    it('should generate correct message object',()=>{
         //store res in variable

        //assert from match
        //assert text match
        //assert createdAt is number
        var from = 'Jen';
        var text = 'Message hello';
        var message = generateMessage(from,text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,text});
    })
})

describe('generateLocationMessage',()=>{
    it('should generate correct location object',()=>{
        var from = 'Bhanu';
        var latitude = 18;
        var longitude = 19;
        var url = "https://www.google.com/maps?q=18,19";

        var message = generateLocationMessage(from,latitude,longitude);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,url});
    })
})