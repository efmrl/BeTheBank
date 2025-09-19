document.addEventListener("alpine:init", () => {
    Alpine.data("tipCalculator", () => ({
        mode: "normal",
        billAmount: 0,
        cashCollected: 0,
        tipPercentage: 20,
        desiredPayment: 0,
        showAbout: false,
        aboutContent: "",

        // Helper function to format currency
        formatCurrency(value) {
            return (Number(value) || 0).toFixed(2);
        },

        // Normal mode calculations
        get tipAmount() {
            const bill = Number(this.billAmount) || 0;
            const tip = Number(this.tipPercentage) || 0;
            return (bill * (tip / 100)).toFixed(2);
        },

        get totalWithTip() {
            const bill = Number(this.billAmount) || 0;
            const tip = Number(this.tipPercentage) || 0;
            return (bill * (1 + tip / 100)).toFixed(2);
        },

        get yourActualCost() {
            const totalCharged = Number(this.totalWithTip) || 0;
            const cashReceived = Number(this.cashCollected) || 0;
            return Math.max(0, totalCharged - cashReceived).toFixed(2);
        },

        // Reverse mode calculations
        get requiredTipPercentage() {
            const bill = Number(this.billAmount) || 0;
            const desired = Number(this.desiredPayment) || 0;
            const cash = Number(this.cashCollected) || 0;

            if (bill === 0) return "0.0";

            // Total charged = desired payment + cash collected
            const totalCharged = desired + cash;

            // Tip percentage = (totalCharged - bill) / bill * 100
            const tipPercentage = ((totalCharged - bill) / bill) * 100;

            return Math.max(0, tipPercentage).toFixed(1);
        },

        get requiredTipAmount() {
            const bill = Number(this.billAmount) || 0;
            const tipPercent = Number(this.requiredTipPercentage) || 0;
            return (bill * (tipPercent / 100)).toFixed(2);
        },

        get grandTotal() {
            const bill = Number(this.billAmount) || 0;
            const tipAmount = Number(this.requiredTipAmount) || 0;
            return (bill + tipAmount).toFixed(2);
        },

        async loadAbout() {
            if (this.aboutContent === "") {
                try {
                    const response = await fetch("/about");
                    this.aboutContent = await response.text();
                } catch (error) {
                    this.aboutContent = "<p>Error loading about content.</p>";
                }
            }
            this.showAbout = true;
        },
    }));
});
