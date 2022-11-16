export default {
    data() {
        return {
            searchId: "",
            staff: {
                staffId: "",
                firstName: "",
                lastName: "",
                password: "",
                accountActive: true,
                staffRoles: [],
            },
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
                this.staffList.push(this.staff);
                return response.json();
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
                data.forEach((staff) => {
                    this.staffList.push(staff);
                });
            }).catch((error) => {
                this.$store.commit("displayNotification", ["server responded with an error", "daisyui-alert-error", "error.svg"]);
            })
        },
        deleteStaff: function(staffId, index) {
            const authToken = this.$store.getters.getAuthToken;
            console.log(`Deletign staff with id: ${staffId} and removing from index: ${index}`);
            fetch(`/api/user/deleteUser?staffId=${staffId}`, {
                method: "DELETE",
                headers: {
                    Authorization: authToken
                }
            }).then((response) => {
                if(response.status !== 200) {
                    this.$store.commit("displayNotification", ["error deleting that staff record", "daisyui-alert-error", "error.svg"]);
                }
                this.$store.commit("displayNotification", ["deleted staff record with that id", "daisyui-alert-success", "success.svg"]);
                this.staffList.splice(index, 1);
            }).catch((error) => {
                this.$store.commit("displayNotification", ["server responded with an error", "daisyui-alert-error", "error.svg"]);
            })
        }
    },
    mounted() {
        this.getAllStaff(0);
    }
}