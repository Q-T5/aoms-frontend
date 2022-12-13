import MedProg from '../medicalprogress.js'
export default {
    data() {
        return {
            action: "create",
            animal: {
                animalId: null,
                commonName: "",
                whereFound: "",
                age: null,
                dateBrought: null,
                animalDetail: {
                    animalId: null,
                    dateAdopted: null,
                    adopteeName: "",
                    contactNumber: "",
                    residentialLocation: ""
                }
            },
            animalProgress: {
                animalId: null,
                foods: "",
                weight: 0.0,
                medicalProgress: [/**is an array of medProg objects */]
            },
            medProg: {
                checkupDate: null,
                checkupNotes: "",
                nextCheckupDate: null
            },
            medProgRec: {
                checkupDate: null,
                checkupNotes: "",
                nextCheckupDate: null
            },
            showEntryForm: false,
            currentRecord: null
        }
    },
    "methods": {
        createNewAnimal() {
            const authToken = this.$store.getters.getAuthToken;
            if(this.animal.commonName === "" || this.animal.animalDetail.dateBrought === null) {
                this.$store.commit("displayNotification", ["fill all required fields", "daisyui-alert-warning", "alert.svg"]);
            } else {
              this.displayFormError = false;
              fetch("/api/animals/createAnimal", {
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json",
                    "Authorization": authToken
                },
                "body": JSON.stringify(this.animal)
              })
              .then((response) => {
                if(response.status === 201) {
                  this.$store.commit("displayNotification", ["successfully created new animal", "daisyui-alert-success", "success.svg"]);
                  return response.json();
                }
              })
              .then((data) => {
                this.animal = data;
                this.animal.animalId = data.animalId;
                this.animal.animalDetail.animalId = data.animalDetail.animalId;
                this.animalProgress.animalId = data.animalId;
                this.emitter.emit("refreshList");
              })
              .catch((error) => {
                this.$store.commit("displayNotification", ["failed to create new record", "daisyui-alert-error", "error.svg"]);
              })
            }
        },

        updateAnimal() {
            const authToken = this.$store.getters.getAuthToken;
            if(this.animal.commonName === "" || this.animal.age === null || this.animal.animalDetail.dateBrought === null) {
                this.displayFormError = true;
            } else {
                this.displayFormError = false;
                fetch("/api/animals/updateAnimal", {
                    "method": "PUT",
                    "headers": {
                        "Content-Type": "application/json",
                        "Authorization": authToken
                    },
                    "body": JSON.stringify(this.animal)
                })
                .then((response) => {
                    if(response.status === 200) {
                        this.$store.commit("displayNotification", ["updated animal data successfully", "daisyui-alert-success", "success.svg"]);
                        return response.json();
                    }
                })
                .then((data) => {
                    this.animal = data;
                    this.animal.animalId = data.id;
                    this.animal.animalDetail.animalId = data.animalDetail.id;
                    this.animalProgress.animalId = data.id;
                })
                .catch((error) => {
                    this.$store.commit("displayNotification", ["failed to update this record", "daisyui-alert-error", "error.svg"]);
                })
            }
        },

        addNewCheckupRecord() {
            this.medProg.checkupNotes = "";
            this.medProg.checkupDate = null;
            this.medProg.nextCheckupDate = null;
        },

        newMedicalProgress() {
            this.disableFields = true;
            this.animalProgress.medicalProgress.push(new MedProg(this.medProg.checkupDate, 
            this.medProg.checkupNotes, this.medProg.nextCheckupDate));
            this.scrollThroughRecords();
        },

        createNewMedRecord() {
            const authToken = this.$store.getters.getAuthToken;
            fetch("/api/animals/newAnimalRecord", {
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json",
                    "Authorization": authToken
                },
                "body": JSON.stringify(this.animalProgress)
            })
            .then((response) => {
                if(response.status === 201) {
                this.$store.commit("displayNotification", ["created medical record successfully", "daisyui-alert-success", "success.svg"]);
                return response.json();
                }
            })
            .then((data) => {
                this.animalProgress = data;
                this.scrollThroughRecords();
            })
            .catch((error) => {
                this.$store.commit("displayNotification", ["failed to save medical record", "daisyui-alert-error", "success.svg"]);
            })
        },

        updateMedicalRecord() {
            const authToken = this.$store.getters.getAuthToken;
            fetch("/api/animals/updateAnimalRecord", {
                "method": "PUT",
                "headers": {
                    "Content-Type": "application/json",
                    "Authorization": authToken
                },
                "body": JSON.stringify(this.animalProgress)
            })
            .then((response) => {
                if(response.status === 200) {
                this.$store.commit("displayNotification", ["updated medical record successfully", "daisyui-alert-success", "success.svg"]);
                return response.json();
                }
            })
            .then((data) => {
                this.animalProgress = data;
                this.scrollThroughRecords();
            })
            .catch((error) => {
                this.$store.commit("displayNotification", ["failed to update medical record", "daisyui-alert-error", "success.svg"]);
            })
        },
      
        getMedicalRecord(id) {
            const authToken = this.$store.getters.getAuthToken;
            fetch(`/api/animals/getAnimalRecord/${id}`, {
                method: "GET",
                headers: {
                    Authorization: authToken
                }
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(`Animal's medical progress so far: ${JSON.stringify(data, null, 2)}`);
                this.animalProgress = data;
                this.scrollThroughRecords();
            })
            .catch((error) => {
                this.$store.commit("displayNotification", ["failed to retrieve medical record", 
                "daisyui-alert-error", "success.svg"]);
            })
        },

        scrollThroughRecords(step = 0) {
            this.currentRecord += step;
            
            if(
                ((this.currentRecord + step) > (this.animalProgress.medicalProgress.length) - 1)
            ) {
                this.currentRecord = (this.animalProgress.medicalProgress.length) - 1;
                this.medProgRec = this.animalProgress.medicalProgress[this.currentRecord];
            } else if(
                ((this.currentRecord + step) < 0)
            ) {
                this.currentRecord = 0;
                this.medProgRec = this.animalProgress.medicalProgress[this.currentRecord];
            }

            this.medProgRec = this.animalProgress.medicalProgress[this.currentRecord];
        },

        showPreviousRecord() {
            this.scrollThroughRecords(-1);
        },

        showNextRecord() {
            this.scrollThroughRecords(1);
        }
    },
    "watch": {
        "animalProgress.medicalProgress"() {
            this.currentRecord =  this.animalProgress.medicalProgress.length - 1;
            this.scrollThroughRecords();
        }
    }
}
