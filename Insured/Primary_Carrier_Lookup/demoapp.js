if (window.self !== window.top) {
    // Remove the copyright if in an iFrame
    document.getElementById("copyright").innerHTML = "";
}

const apiClient = createAPIClient();

new Vue({
        delimiters: ['[[', ']]'],
        el: '#demoapp',
        data () {
            return {
                carrierName: null,
                carrierAddress: null,
                carrierCityStateZip: null,
                carrierPhone: null,
                loading: false,
                errored: false
            };
        },
        methods: {
            lookupCarrier: function() {
                // Call the API using Axios
                this.loading = true;
                apiClient.post('/api/v2/insured/get_primary_carrier', {})
                    .then(response => {
                    this.carrierName = response.data.data.name;
                    this.carrierAddress = response.data.data.addresses[0].address_line1;
                    this.carrierCityStateZip = response.data.data.addresses[0].address_city + ', '
                                                    + response.data.data.addresses[0].address_state + ' '
                                                    + response.data.data.addresses[0].address_zip;
                    this.carrierPhone = response.data.data.phones[0].phone;
                    // Log the JSON response
                    console.log(response.data);
                    })
                    .catch(error => {
                        console.log(error);
                        this.errored = true;
                    })
                    .finally(() => this.loading = false);
            }
        }
    });
