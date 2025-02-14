// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SupplyChain {
    address public owner;  // Contract owner

    constructor() {
        owner = msg.sender;  // Set deployer as owner
    }

    // Modifier to allow only the owner to execute certain functions
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    // Transfer ownership to another address (if needed)
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "Invalid address");
        owner = newOwner;
    }

    // Enum to represent different supply chain stages
    enum Stage {
        Ordered,
        RawMaterialSupplied,
        Manufactured,
        Distributed,
        Retail,
        Sold
    }

    // Structure to store details of a medicine
    struct Medicine {
        uint256 id;
        string name;
        string description;
        address supplier;
        address manufacturer;
        address distributor;
        address retailer;
        Stage stage;
    }

    // Structure for supply chain participants
    struct Participant {
        address addr;
        string name;
        string location;
    }

    // Mappings to store data
    mapping(uint256 => Medicine) public medicines;
    mapping(address => Participant) public suppliers;
    mapping(address => Participant) public manufacturers;
    mapping(address => Participant) public distributors;
    mapping(address => Participant) public retailers;

    // Counters to assign unique IDs
    uint256 public medicineCounter;

    // Add new medicine (only owner)
    function addMedicine(string memory _name, string memory _description) public onlyOwner {
        medicineCounter++;
        medicines[medicineCounter] = Medicine(
            medicineCounter,
            _name,
            _description,
            address(0),  // No supplier assigned yet
            address(0),  // No manufacturer assigned yet
            address(0),  // No distributor assigned yet
            address(0),  // No retailer assigned yet
            Stage.Ordered
        );
    }

    // Register supply chain participants (only owner)
    function addSupplier(address _addr, string memory _name, string memory _location) public onlyOwner {
        suppliers[_addr] = Participant(_addr, _name, _location);
    }

    function addManufacturer(address _addr, string memory _name, string memory _location) public onlyOwner {
        manufacturers[_addr] = Participant(_addr, _name, _location);
    }

    function addDistributor(address _addr, string memory _name, string memory _location) public onlyOwner {
        distributors[_addr] = Participant(_addr, _name, _location);
    }

    function addRetailer(address _addr, string memory _name, string memory _location) public onlyOwner {
        retailers[_addr] = Participant(_addr, _name, _location);
    }

    // Supply raw materials (Only Supplier)
    function supplyRawMaterials(uint256 _medicineID) public {
        require(suppliers[msg.sender].addr != address(0), "Not a registered supplier");
        require(medicines[_medicineID].stage == Stage.Ordered, "Invalid stage");
        medicines[_medicineID].supplier = msg.sender;
        medicines[_medicineID].stage = Stage.RawMaterialSupplied;
    }

    // Manufacture medicine (Only Manufacturer)
    function manufactureMedicine(uint256 _medicineID) public {
        require(manufacturers[msg.sender].addr != address(0), "Not a registered manufacturer");
        require(medicines[_medicineID].stage == Stage.RawMaterialSupplied, "Invalid stage");
        medicines[_medicineID].manufacturer = msg.sender;
        medicines[_medicineID].stage = Stage.Manufactured;
    }

    // Distribute medicine (Only Distributor)
    function distributeMedicine(uint256 _medicineID) public {
        require(distributors[msg.sender].addr != address(0), "Not a registered distributor");
        require(medicines[_medicineID].stage == Stage.Manufactured, "Invalid stage");
        medicines[_medicineID].distributor = msg.sender;
        medicines[_medicineID].stage = Stage.Distributed;
    }

    // Retail medicine (Only Retailer)
    function retailMedicine(uint256 _medicineID) public {
        require(retailers[msg.sender].addr != address(0), "Not a registered retailer");
        require(medicines[_medicineID].stage == Stage.Distributed, "Invalid stage");
        medicines[_medicineID].retailer = msg.sender;
        medicines[_medicineID].stage = Stage.Retail;
    }

    // Mark medicine as sold (Only assigned retailer)
    function sellMedicine(uint256 _medicineID) public {
        require(medicines[_medicineID].retailer == msg.sender, "Not the assigned retailer");
        require(medicines[_medicineID].stage == Stage.Retail, "Invalid stage");
        medicines[_medicineID].stage = Stage.Sold;
    }

    // Get current stage of medicine
    function getMedicineStage(uint256 _medicineID) public view returns (string memory) {
        require(_medicineID > 0 && _medicineID <= medicineCounter, "Invalid medicine ID");

        if (medicines[_medicineID].stage == Stage.Ordered) return "Ordered";
        if (medicines[_medicineID].stage == Stage.RawMaterialSupplied) return "Raw Material Supplied";
        if (medicines[_medicineID].stage == Stage.Manufactured) return "Manufactured";
        if (medicines[_medicineID].stage == Stage.Distributed) return "Distributed";
        if (medicines[_medicineID].stage == Stage.Retail) return "Retail";
        if (medicines[_medicineID].stage == Stage.Sold) return "Sold";

        return "Unknown";
    }
}