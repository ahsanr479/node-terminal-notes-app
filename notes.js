const fs =  require('fs');
const chalk = require('chalk');

const getNotes =() => {
    return "Your notes...";
}

const addNote = (title,body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find(note => note.title === title);

    debugger

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log(chalk.green.inverse('Note Added'))
    } else {
        console.log(chalk.red.inverse('Note Title Taken!'));
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.bold.italic.underline.inverse.magenta('Your Notes'));
    notes.forEach(element => console.log(element.title));
}

const removeNote =(title) => {
    const notes = loadNotes();
    const duplicateNotes = notes.filter(note => note.title !== title);
    if(notes.length > duplicateNotes.length){
        console.log(chalk.green.inverse('Note removed'));
    }else {
        console.log(chalk.red.inverse('No Note found!'));
    }
}

const readNote = (title) => {
    const notes = loadNotes();
    const readNote = notes.find(note => note.title === title);
    if(readNote){
        console.log(chalk.bold.italic.underline.inverse.magenta(readNote.title));
        console.log(readNote.body);
    }else{
        console.log(chalk.red.inverse('No Note Found!'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json',dataJSON);
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(e){
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};