<style lang="scss">
    @import '../theme/variables.scss';
    .custom-file-upload {
        display: inline-block;
        padding: 12px;
        cursor: pointer;
        text-transform: uppercase;
        font-weight: 500;
        color: map-get($primary-palette, 100);
    }

    .custom-file-upload:hover {
        background-color: map-get($primary-palette, A500);
        border-radius: 3px;
        padding: 12px;
    }

    .inventory-upload-dialog :global(.inventory-file-upload) {
        position: relative;
        -webkit-transition: left 0.5s ease-in-out;
        -moz-transition: left 0.5s ease-in-out;
        -o-transition: left 0.5s ease-in-out;
        transition: left 0.5s ease-in-out;
        left: 0;
    }

    .inventory-upload-dialog :global(.moved-left) {
        left: -600px;
    }

    .inventory-upload-dialog :global(.mdc-dialog__content) {
        overflow-x: hidden;
    }

    .inventory-upload-dialog :global(.mdc-dialog__actions) {
        justify-content: space-between;
    }

    .back-button :global(button) {
        display: none;
    }

    .inventory-upload-dialog :global(.cars-image-upload) {
        position: relative;
        -webkit-transition: right 0.5s ease-in-out;
        -moz-transition: right 0.5s ease-in-out;
        -o-transition: right 0.5s ease-in-out;
        transition: right 0.5s ease-in-out;
        right: 0;
    }

    .inventory-upload-dialog :global(.moved-right) {
        right: -600px;
    }

    .car-desc-header {
        font-size: 25px;
        font-weight: 900;
        padding-bottom: 10px;
        border-bottom: 2px solid map-get($secondary-palette, 300);
        color: map-get($primary-palette, 200);
    }

    .car-detail-split, .image-list {
        display: flex;
    }

    .car-detail-split .bold-car-detail {
        width: 50%
    }

    .bold-car-detail {
        font-weight: 800;
        color: $black;
    }

    .car-img-container {
        position: relative;
        min-width: 40%;
        max-width: 50%;
    }

    .car-img-container :global(.top-right-btn) {
        position: absolute;
        top: 0;
        right: 0;
        background-color: map-get($grey-palette, 500);
        color: map-get($primary-palette, 600);
        font-size: 15px;
        padding: 2px 8px;
        border: none;
        cursor: pointer;
        visibility: hidden;
        border-radius: 50%;
        width: 30px;
        height: 30px;
    }

    .car-img-container:hover :global(.top-right-btn) {
        visibility: visible;
    }

    .car-img-container :global(.top-right-btn:hover) {
        background-color: $black;
    }

    .image-list {
        flex-wrap: wrap;
    }

    .image-list img {
        width: 100%;
    }

    .car-inventory-amount {
        color: $black;
        font-size: 25px;
    }
</style>
<div class="inventory-upload-dialog">
    <Dialog
    bind:this="{dialog}"
    bind:open="{dialogOpen}"
    fullscreen
    aria-labelledby="title"
    aria-describedby="content"
    >
        <Header>
            <Title id="title">{title}</Title>
            <IconButton action="close" class="material-icons">close</IconButton>
        </Header>
        <Content id="content">
            <div class="inventory-file-upload {inventoryContentClass}">
                <p>Upload the file with all of your inventory. We will begin the process once that is done.</p>
                <div class="text-center">
                    <label for="file-upload" class="custom-file-upload">
                        <span>Upload File</span>
                    </label>
                    <input
                        id="file-upload"
                        class="no-display"
                        type="file"
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .json, .csv"
                        on:change="{fileToJson}"
                    />
                </div>
            </div>
            <div class="cars-image-upload {carsContentClass}">
                <p class="text-center car-inventory-amount">{cars.length} cars added</p>
                <p>Look at the information below, check that it is correct, and upload the individual car images.</p>
                {#each cars as car, index}
                    <p class="car-desc-header">{index + 1}. {car.brand} {car.model} - {car.year}</p>
                    <div class="car-detail-split">
                        <div class="bold-car-detail">
                            <p>VIN:</p>
                            <p>Brand/Model:</p>
                            <p>Year:</p>
                            <p>Color:</p>
                            <p>Initial Price:</p>
                        </div>
                        <div>
                            <p>{car.vin}</p>
                            <p>{car.brand} {car.model}</p>
                            <p>{car.year}</p>
                            <p>{car.color}</p>
                            <p>${car.price}</p>
                        </div>
                    </div>
                    <div class="text-center">
                        <label for="image-file-upload-{index}" class="custom-file-upload">
                            <span>Add Images</span>
                        </label>
                        <input
                            id="image-file-upload-{index}"
                            class="no-display"
                            type="file"
                            accept="image/*"
                            multiple
                            on:change="{event => addImages(event, car)}"
                        />
                        {#if upload[car.vin] && upload[car.vin].length != 0}
                            <p>{upload[car.vin].length} images</p>
                            <div class="image-list">
                                {#each upload[car.vin] as image, x}
                                    <div class="car-img-container">
                                        <img src={image.url} alt={image.raw.name} />
                                        <IconButton class="material-icons top-right-btn" on:click={() => deleteImage(car.vin, x)}>close</IconButton>
                                    </div>
                                {/each}
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>
        </Content>
        <Actions>
            <span class="{backButtonClass}"><IconButton class="material-icons" on:click={() => resetClasses()}>arrow_back</IconButton></span>
            <span class="{backButtonClass}"><Button disabled={checkUploadAbility()} on:click={() => emit("submit")}>Update Inventory</Button></span>
            {#if cars.length != 0 && backButtonClass != ""}
                <IconButton class="material-icons" on:click={() => slideRight()}>arrow_forward</IconButton>
            {/if}
        </Actions>
    </Dialog>
</div>

<script>
    import Dialog, { Header, Title, Content, Actions } from '@smui/dialog';
    import IconButton from '@smui/icon-button';
    import Button from '@smui/button';
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    let dialog;
    let dialogOpen;

    let cars = [];
    let carsFile;
    let inventoryContentClass = "";
    let backButtonClass = "back-button";
    let carsContentClass = "moved-right";
    let title = "Upload Inventory File";
    let upload = {};
    let bannerOpen = false;

    export function open() {
        resetClasses(true);
        dialogOpen = true;
    }

    async function fileToJson(event) {
        let file = event.target.files[0];
        carsFile = file;
        document.getElementById('file-upload').value = "";
        let reader = new FileReader(); 
        reader.addEventListener('load', function() {
            cars = JSON.parse(reader.result);
            slideRight();
        });
        reader.readAsText(file);
    }

    function slideRight() {
        inventoryContentClass = "moved-left";
        backButtonClass = "";
        carsContentClass = "no-display";
        setTimeout(() => {
            inventoryContentClass = "moved-left no-display";
            carsContentClass = "";
            title = "Upload Individual Car Images";
        }, 500);
    }

    function emit(reason) {
        dispatch(reason, [cars, upload, carsFile]);
    }

    function resetClasses(start=false) {
        document.getElementById('file-upload').value = "";
        if (start) {
            inventoryContentClass = "";
            carsContentClass = "moved-right no-display";
            cars = [];
            upload = {};
        }
        else {
            inventoryContentClass = "no-display";
            carsContentClass = "moved-right";
            setTimeout(() => {
                inventoryContentClass = "";
                carsContentClass = "moved-right no-display"
            }, 500);
        }
        title = "Upload Inventory File";
        backButtonClass = "back-button";
    }

    async function addImages(event, car) {
        let files = event.target.files;
        if (!upload[car.vin]) upload[car.vin] = [];
        for (let i = 0; i < files.length; i++) {
            let file = {};
            file["raw"] = files[i];
            let reader = new FileReader();
            await reader.readAsDataURL(files[i]);
            reader.onload = (_event) => {
                file["url"] = reader.result;
                upload[car.vin].push(file);
                upload = {...upload};
            }
        }
    }

    function deleteImage(vin, index) {
        upload[vin] = [...upload[vin].slice(0, index), ...upload[vin].slice(index + 1)];
        upload = {...upload};
    }

    $: checkUploadAbility = () => {
        let available = true;
        if (cars.length == 0 || upload == {}) available = false;
        for (let i = 0; i < cars.length; i++) {
            let vin = cars[i].vin;
            if (!upload[vin] || upload[vin].length == 0) {
                available = false;
                break;
            }
        }
        return !available;
    }
</script>
