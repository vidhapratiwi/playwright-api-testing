const { test, expect } = require("@playwright/test")
const { Ajv } = require("ajv");


const ajv = new Ajv();


//fixture request untuk api
//fixture page untuk ui
test('TC-1 GET Request', async ({ request }) => {
    const response = await request.get("https://api.restful-api.dev/objects")
    //hasil response
    const resp = await response.json();

    //assert
    //status code
    expect(response.status()).toEqual(200)
    //ok=berupa boolean, apakah response.status t/f
    expect(response.ok()).toBeTruthy()

    //validasi json schema
    const valid = ajv.validate(require("./../json-schema/add-object.schema.json"), resp);
    
    if (!valid) {
    console.error("AJV Validation Errors:", ajv.errorsText());
    }

    //saat kondisi (true) malah gagal, tapi saat false malah berhasil
    expect(valid).toBe(false);
});

test('TC-2 POST Request', async ({ request }) => {
    
    const reqHeaders = {
        Accept: 'application/json'
    }

    const body = {
        "name": "Apple MacBook Pro 16 Vidha",
        "data":{
            "year": 2019,
            "price": 1849.99,
            "CPU model": "Intel Core i9",
            "Hard disk size": "1 TB"
        }
    }

    const response = await request.post("https://api.restful-api.dev/objects", {
        headers: reqHeaders, 
        data: body,
    })

    //hasil response
    //console.log(await response.json());

    expect(response.status()).toEqual(200)
    expect(response.ok()).toBeTruthy()

    //validasi json schema
    const resBody = await response.json()
    expect(resBody.name).toEqual('Apple MacBook Pro 16 Vidha')
    
    const valid = ajv.validate(require("./../json-schema/add-object.schema.json"), resBody);
    
    if (!valid) {
    console.error("AJV Validation Errors:", ajv.errorsText());
    }

    expect(valid).toBe(true);

});


//put dan delete belum berhasil

// test('TC-3 PUT Request', async ({ request }) => {
    
//     const reqHeaders = {
//         Accept: 'application/json'
//     }

//     const body = {
//         "name": "Apple MacBook Pro 16",
//         "data": {
//             "year": 2019,
//             "price": 2049.99,
//             "CPU model": "Intel Core i9",
//             "Hard disk size": "1 TB",
//             "color": "silver"
//         }
//     }

//     const response = await request.put("https://api.restful-api.dev/objects/7", {
//         headers: reqHeaders, 
//         data: body,
//     })

//     //hasil response
//     console.log(await response.json());

//     expect(response.status()).toEqual(200)
//     expect(response.ok()).toBeTruthy()

//     //validasi json schema
//     // const resBody = await response.json()
//     // expect(resBody.name).toEqual('Apple MacBook Pro 16')
    
//     // const valid = ajv.validate(require("./../json-schema/add-object.schema.json"), resBody);
    
//     // if (!valid) {
//     // console.error("AJV Validation Errors:", ajv.errorsText());
//     // }

//     // expect(valid).toBe(true);

// });

// test('TC-4 DELETE Request', async ({ request }) => {
//     const response = await request.delete("https://api.restful-api.dev/objects/7")
//     //hasil response
//     console.log(await response.json());

//     //assert
//     //status code
//     expect(response.status()).toEqual(200)
//     //ok=berupa boolean, apakah response.status t/f
//     expect(response.ok()).toBeTruthy()
// });

// test.describe('Positive Test', () => {
//     test('Test Case 1', async ({ page }) => {
    
//     });
    
//     test('Test Case 2', async ({ page }) => {
        
//     });
    

// });

// test.describe('Negative Test', () => {
//     test('Test Case 1', async ({ page }) => {
    
//     });
    
//     test('Test Case 2', async ({ page }) => {
        
//     });
    

// });