({
    startGame : function(component, event, helper) {
        // Access combo box
        let gameModeComboBox = component.find("gameMode");
        // Access the value of comboBox
        let selectedValue = gameModeComboBox.get("v.value");

        console.log("the start game button is clicked.The Game mode is " + selectedValue);
        alert("the start game button is clicked.The Game mode is " + selectedValue);
        
    } ,

    reshuffleBoard : function(component, event, helper) {
        console.log('the Reshuffle button is clicked');
    }
})