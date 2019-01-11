const { default: Neon, api, wallet, tx, rpc, CONST, nep5, u } = require("@cityofzion/neon-js");
var network = "http://47.254.91.93:51335";
var rpcClient = new rpc.RPCClient(network);
cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        editbox: cc.EditBox,
    },

    onLoad: function () {
        this.editbox.node.on('editing-did-ended', this.callback2, this);
    },

    callback2: function (event) {
        //这里的 event 是一个 EventCustom 对象，你可以通过 event.detail 获取 EditBox 组件
        console.log('wo 被调用了')
        var privateKey = event._string;
        try
        {
            var account = new wallet.Account(privateKey);
        }
        catch(err)
        {
            this.label.string="输入错误"
        }
        var address = account._address;
        rpcClient.getAccountState(address)
        .then(result =>{
            for(var balance of result.balances){
                if(balance.asset === "0x"+CONST.ASSET_ID.NEO) balance.asset = "NEO"
                if(balance.asset === "0x"+CONST.ASSET_ID.GAS) balance.asset = "GAS"
             }
            this.label.string=result.balances[0].asset+":"+result.balances[0].value;
            console.log(result.balances[0])
        })
        .catch(err => {
            console.log(err);
            this.label.string="0 NEO  0 GAS";
        });
     }
});
