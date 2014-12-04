/**
 * Extension Template for Cloud9 IDE
 * 
 * Inserts a context menu item under the "Edit" menu, which, when
 * clicked, displays a simple window with a "Close" button.
 * 
 * This file is stripped of comments in order to provide a quick template for 
 * future extensions. Please reference our documentation for a list of what's
 * going on.
 *
 * @copyright 2012, Ajax.org B.V.
 * @license GPLv3 <http://www.gnu.org/licenses/gpl.txt>
 */
 
define(function(require, exports, module) {

var ext = require("core/ext");
var ide = require("core/ide");

var menus = require("ext/menus/menus");
var commands = require("ext/commands/commands");
var markup = require('./testplugin.xml.js');

module.exports = ext.register("ext/testplugin/testplugin", {
    name     : "Test Plugin",
    dev      : "Ajax.org",
    alone    : true,
    deps     : [],
    type     : ext.GENERAL,
    markup   : markup,

    nodes : [],

    init : function(){
        var _self = this;
        this.winTestPlugin = winTestPlugin;
        this.btnClose = btnClose;
        this.btnClose.addEventListener('click', __bind(function() {
          return this.winTestPlugin.close();
        }, this));
        
        commands.addCommand({
            name: "sayhello",
            hint: "I'll say something",
            msg: "Popping window!",
            bindKey: {mac: "Shift-1", win: "Ctrl-1"},
            isAvailable : function() {
                return true;    
            },
            exec: function() {
                _self.winTestPlugin.show()
            }
        });
        
        this.nodes.push(
            menus.addItemByPath("Edit/Test Plugin", new apf.item({
                command : "sayhello"
            }), 5400)
        ); 

       /* Just a plain menu...
        this.nodes.push(
            menus.addItemByPath("Edit/Demo Test", new apf.item({
                onclick : function(){
                    _self.winDemoTest.show();
                }
            }), 5400)
        ); */
    },

    hook : function(){
        var _self = this;
        ext.initExtension(this);
    },

    enable : function(){
        this.nodes.each(function(item){
            item.enable();
        });
    },

    disable : function(){
        this.nodes.each(function(item){
            item.disable();
        });
    },

    destroy : function(){
        this.nodes.each(function(item){
            item.destroy(true, true);
        });
        this.nodes = [];
        this.btnClose.removeEventListener('click');
        this.btnClose.destroy(true, true);
    },

     closeTestPluginWindow : function(){
        this.winTestPlugin.close();
     }
});

});
