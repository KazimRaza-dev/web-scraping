const {
  By,
  Builder,
} = require("selenium-webdriver");
require("chromedriver");

async function main() {
  let driver = await new Builder().forBrowser("chrome").build();

  await driver.get(
    "https://www.healthhub.sg/directory/clinics-and-polyclinics"
  );

  const title = await driver.getTitle();
  console.log("Title is: ", title);

  const nextButtonClassName = await driver
    .findElement(
      By.id(
        "ctl00_ctl36_g_db0843df_d81d_4c3f_b3b0_3ad10493dba6_ctl00_PaginationMain_lnkNextResponsive"
      )
    )
    .getAttribute("class");

  while (!nextButtonClassName.includes("aspNetDisabled")) {
    const allClinics = await driver.findElements(
      By.xpath("//a[contains(@class, 'appointment')]")
    );

    allClinics.forEach(async (clinic) => {
      const clinicLink = await clinic.getAttribute("href");
      console.log(clinicLink);
    });

    const nextButton = await driver.findElement(
      By.id(
        "ctl00_ctl36_g_db0843df_d81d_4c3f_b3b0_3ad10493dba6_ctl00_PaginationMain_lnkNext"
      )
    );
    await nextButton.click();
  }
}

main();
