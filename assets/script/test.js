const { default: Neon, api, wallet, tx, rpc, CONST, nep5, u } = require("@cityofzion/neon-js");
var network = "http://47.254.91.93:51335";
var rpcClient = new rpc.RPCClient(network);
cc.Class({
    extends: cc.Component,

    properties: {
        button: cc.Button,
        label: {
            default: null,
            type: cc.Label
        },
        properties: {
            editbox: cc.EditBox
         },
    },

    onLoad: function () {
        this.button.node.on('click', this.callback1, this);
    },

    callback1: function (button) {
        var newWallet = new wallet.Wallet();
        newWallet.addAccount(new wallet.Account());
        this.label.string = "privateKey: " + newWallet.accounts[0].privateKey+'     '  + "address: " + newWallet.accounts[0].address;
    },
});
