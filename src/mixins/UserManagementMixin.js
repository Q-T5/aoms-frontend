export default {
    data() {
        return {
            searchId: "",
            staff: {
                staffId: "",
                firstName: "",
                lastName: "",
                password: "",
                accountStatus: true,
                staffRole: [],
                recoveryPhrase: ""
            },
            displayEditButtons: false,
            staffList: []
        }
    },
    methods: {
        generateStaffId: function() {
            const suffixInt = Math.floor((Math.random() * 10000) + 1);
            const staffId = "STAFF-" + suffixInt;
            this.staff.staffId = staffId;
        },
        signupUser: function() {
            fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.staff)
            }).then((response) => {
                if(response.status !== 201) {
                    this.$store.commit("displayNotification", ["failed to create new user account", "daisyui-alert-error", "error.svg"]);
                }
                this.$store.commit("displayNotification", ["successfully created new user account", "daisyui-alert-success", "success.svg"]);
                return response.json();
            }).then((data) => {
                console.log(`Data saved is: ${ JSON.stringify(data, null, 2) }`);
            }).catch((error) => {
                this.$store.commit("displayNotification", ["error creating new user account", "daisyui-alert-error", "error.svg"]);
            })
        },
        getStaff: function(staffId) {
            const authToken = this.$store.getters.getAuthToken;
            fetch(`/api/user/getUser?staffId=${staffId}`, {
                method: "GET",
                headers: {
                    Authorization: authToken
                }
            }).then((response) => {
                if(response.status !== 200) {
                    this.$store.commit("displayNotification", ["staff with that id not found", "daisyui-alert-error", "error.svg"]);
                }
                this.$store.commit("displayNotification", ["found staff record with that id", "daisyui-alert-success", "success.svg"]);
                return response.json();
            }).then((data) => {
                this.staff = data;
            }).catch((error) => {
                this.$store.commit("displayNotification", ["error finding staff with that id", "daisyui-alert-error", "error.svg"]);
            })
        },
        getAllStaff: function(page) {
            const authToken = this.$store.getters.getAuthToken;
            console.log("Auth token: " + authToken);
            fetch(`/api/user/getAllUsers?page=${page}`, {
                method: "GET",
                headers: {
                    Authorization: authToken
                }
            }).then((response) => {
                if(response.status !== 200) {
                    this.$store.commit("displayNotification", ["error fetching staff list", "daisyui-alert-error", "error.svg"]);
                }

                return response.json();
            }).then((data) => {
                data.forEach((staff, index) => {
                    this.staffList.push(staff);
                });
                console.log(`Retrieved list: ${ JSON.stringify(this.staffList, null, 2) }`);
            })
        }
    },
    mounted() {
        this.getAllStaff(0);
    }
}