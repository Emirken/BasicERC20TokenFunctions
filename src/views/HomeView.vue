<template>
  <v-row>
    <v-alert type="info" text="Firstly,connect your metamask account" ></v-alert>
  </v-row>
    <v-card class="mt-15" elevation="5">
      <v-row class="text-center py-2">
          <v-col cols="6">
             <v-chip>Main Account</v-chip>
            <v-row class="text-start px-5 mt-3">
              <v-col>
                <v-btn @click="getBalanceAccount('0x7660df4eC8b2a585f18392E8EC5298859a9A3186')">Get Balance Main Account</v-btn>
              </v-col>
            </v-row>
            <v-row class="px-5">
                <v-col class="align-content-center" cols="4">
                  <v-btn @click="getTransfertoOtherAccount('0x7660df4eC8b2a585f18392E8EC5298859a9A3186','0xB9AEe3e3387c95836dD78d23A53787aC074B4682',transferAmount)" >Get Transfer to Account 2</v-btn>
                </v-col>
              <v-col  cols="4">
                  <v-text-field v-model="transferAmount" hide-spin-buttons type="number" placeholder="Enter to Amount" class="mt-3" density="compact" variant="outlined">
                  </v-text-field>
                </v-col>
              <v-col class="align-content-center">
              </v-col>
            </v-row>

          </v-col>
        <v-divider :thickness="14" color="gray" vertical/>
          <v-col cols="5">
            <v-chip>Account 2</v-chip>
            <v-row class="text-start px-5 mt-3">
              <v-col>
                <v-btn @click="getBalanceAccount('0xB9AEe3e3387c95836dD78d23A53787aC074B4682')">Get Balance Account 2</v-btn>
              </v-col>
            </v-row>
            <v-row >
              <v-col class="align-content-center" cols="6">
                <v-btn @click="getTransfertoOtherAccount('0xB9AEe3e3387c95836dD78d23A53787aC074B4682','0x7660df4eC8b2a585f18392E8EC5298859a9A3186',transferAmount2)">Get Transfer to Main Account</v-btn>
              </v-col>
              <v-col  cols="4">
                <v-text-field v-model="transferAmount2" hide-spin-buttons type="number" placeholder="Enter to Amount" class="mt-3" density="compact" variant="outlined">
                </v-text-field>
              </v-col>
              <v-col class="align-content-center">
              </v-col>
            </v-row>
          </v-col>
      </v-row>
    </v-card>
  <v-card class="mt-5">
    <v-row>
      <v-col>
        <v-responsive height="200" class="border pa-4">
          <v-chip color="#FF6600">
            Result:
          </v-chip>
          <span>
            {{result}}
          </span>
        </v-responsive>
      </v-col>
    </v-row>
  </v-card>

<!--  <div>
    <v-btn @click="fetchContractData">Get Adress Balance</v-btn>
    <p v-if="contractData">Contract Data: {{ contractData }}</p>
  </div>
  <div>
    <v-btn @click="coinSymbol">Get Coin symbol</v-btn>
    <p v-if="symbol">Contract Data: {{ symbol }}</p>

  </div>-->

</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Web3 from 'web3';
import {mapGetters} from "vuex";
import store from "@/store";
import {useToast} from "vue-toastification";

@Options({
  components: {},
  computed: {
    ...mapGetters(['getContractData', 'getContract']),  // Vuex'ten contract verisini almak
  },
})
export default class HomeView extends Vue {
  symbol = '';
  result = ''
  transferAmount = 0
  transferAmount2 = 0
  toast = useToast();
  get contractData() {
    return store.getters.getContractData;
  }

  getBalanceAccount(adress:string){
    const contract = store.state.contract as any;
    contract.methods.balanceOf(adress).call().then((result:any)=>{
      this.result = result + ' PBC'
    });
  }

  getTransfertoOtherAccount(senderAdress:string,adress:string,amount:number){
    const contract = store.state.contract as any;
    contract.methods.transfer(adress,amount).send({ from: senderAdress }).then(()=>{
      this.toast.success("Successfully Transfer");
    });
  }

  coinSymbol(){

    const contract = store.state.contract as any;
    contract.methods.symbol().call().then((result:any)=>{
      this.symbol = result
    });
  }
  fetchContractData() {
    const contract = store.state.contract as any;
    if (store.state.contract) {
      contract.methods.balanceOf('0x7660df4eC8b2a585f18392E8EC5298859a9A3186').call()
          .then((result: any) => {
            store.dispatch('updateContractData', result); // Vuex'te contractData'yı güncelle
          })
          .catch((error: any) => {
            console.error('Error fetching contract data:', error);
          });
    } else {
      console.error('Contract not initialized.');
    }
  }
}
</script>
