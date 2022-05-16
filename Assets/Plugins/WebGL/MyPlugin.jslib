const myPlugin = {
  Hello: function() {
    window.alert("Hello World");
  }
}

mergeInto(LibraryManager.library, myPlugin);