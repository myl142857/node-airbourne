(function(){
  function stopDrop(evt) {
    evt.stopPropagation();
    evt.preventDefault();
  };
  function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    alert('File dropped');
    var files = evt.dataTransfer.files; // FileList object.

    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
      output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                  f.size, ' bytes, last modified: ',
                  f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                  '</li>');
      alert('File name ' + f.name);
    }
    //document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
  };

  function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  };

  // Setup the dnd listeners.
  var dropZone = document.getElementById('airdropIcon');
  dropZone.addEventListener('dragover', handleDragOver, false);
  dropZone.addEventListener('drop', handleFileSelect, false);
  var body = document.getElementById('body');
  body.addEventListener('dragover', handleDragOver, false);
  body.addEventListener('drop', stopDrop, false);

})()
