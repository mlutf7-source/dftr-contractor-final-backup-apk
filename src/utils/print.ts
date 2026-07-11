export function printPage(
    elementId = 'print-report'
    ) {
      const element =
          document.getElementById(elementId);

            if (!element) {
                alert('منطقة الطباعة غير موجودة');
                    return;
                      }

                        const iframe =
                            document.createElement('iframe');

                              iframe.style.position = 'fixed';
                                iframe.style.right = '0';
                                  iframe.style.bottom = '0';
                                    iframe.style.width = '0';
                                      iframe.style.height = '0';
                                        iframe.style.border = '0';
                                          iframe.style.opacity = '0';

                                            document.body.appendChild(iframe);

                                              const doc =
                                                  iframe.contentWindow?.document;

                                                    if (!doc) {
                                                        alert('تعذر تجهيز صفحة الطباعة');
                                                            document.body.removeChild(iframe);
                                                                return;
                                                                  }

                                                                    const styles = Array.from(
                                                                        document.querySelectorAll(
                                                                              'style, link[rel="stylesheet"]'
                                                                                  )
                                                                                    )
                                                                                        .map((node) => node.outerHTML)
                                                                                            .join('\n');

                                                                                              doc.open();

                                                                                                doc.write(`
                                                                                                <!DOCTYPE html>
                                                                                                <html lang="ar" dir="rtl">
                                                                                                <head>
                                                                                                <meta charset="UTF-8"/>
                                                                                                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                                                                                                <title>طباعة</title>

                                                                                                ${styles}

                                                                                                <style>
                                                                                                *{
                                                                                                  box-sizing:border-box;
                                                                                                    font-family:Cairo,Tahoma,Arial,sans-serif;
                                                                                                    }

                                                                                                    html,
                                                                                                    body{
                                                                                                      direction:rtl;
                                                                                                        background:#fff!important;
                                                                                                          color:#111;
                                                                                                            margin:0;
                                                                                                              padding:0;
                                                                                                              }

                                                                                                              body{
                                                                                                                padding:16px;
                                                                                                                }

                                                                                                                .print-page{
                                                                                                                  width:100%;
                                                                                                                    max-width:794px;
                                                                                                                      margin:0 auto;
                                                                                                                        background:#fff;
                                                                                                                        }

                                                                                                                        .no-print,
                                                                                                                        button{
                                                                                                                          display:none!important;
                                                                                                                          }

                                                                                                                          .card{
                                                                                                                            box-shadow:none!important;
                                                                                                                              border:none!important;
                                                                                                                                padding:0!important;
                                                                                                                                  margin:0!important;
                                                                                                                                    background:#fff!important;
                                                                                                                                    }

                                                                                                                                    .table-wrap{
                                                                                                                                      overflow:visible!important;
                                                                                                                                      }

                                                                                                                                      table{
                                                                                                                                        width:100%!important;
                                                                                                                                          border-collapse:collapse!important;
                                                                                                                                            background:#fff!important;
                                                                                                                                            }

                                                                                                                                            th,
                                                                                                                                            td{
                                                                                                                                              border:1px solid #777!important;
                                                                                                                                                padding:7px!important;
                                                                                                                                                  text-align:center!important;
                                                                                                                                                    font-size:12px!important;
                                                                                                                                                      color:#111!important;
                                                                                                                                                      }

                                                                                                                                                      th{
                                                                                                                                                        background:#f3f6ff!important;
                                                                                                                                                          font-weight:800!important;
                                                                                                                                                          }

                                                                                                                                                          .section-row td{
                                                                                                                                                            background:#eef5ff!important;
                                                                                                                                                              font-weight:800!important;
                                                                                                                                                                color:#0B3BB5!important;
                                                                                                                                                                }

                                                                                                                                                                .total-row td{
                                                                                                                                                                  background:#f8f8f8!important;
                                                                                                                                                                    font-weight:800!important;
                                                                                                                                                                    }

                                                                                                                                                                    .balance-row td{
                                                                                                                                                                      background:#eef8ff!important;
                                                                                                                                                                        font-weight:900!important;
                                                                                                                                                                        }

                                                                                                                                                                        .note{
                                                                                                                                                                          display:block!important;
                                                                                                                                                                            margin-top:4px!important;
                                                                                                                                                                              font-size:10px!important;
                                                                                                                                                                                color:#555!important;
                                                                                                                                                                                  line-height:1.4!important;
                                                                                                                                                                                  }

                                                                                                                                                                                  .report-header{
                                                                                                                                                                                    margin-bottom:14px!important;
                                                                                                                                                                                    }

                                                                                                                                                                                    .report-cliche{
                                                                                                                                                                                      display:flex!important;
                                                                                                                                                                                        align-items:center!important;
                                                                                                                                                                                          justify-content:center!important;
                                                                                                                                                                                            gap:14px!important;
                                                                                                                                                                                              text-align:center!important;
                                                                                                                                                                                                margin-bottom:12px!important;
                                                                                                                                                                                                }

                                                                                                                                                                                                .report-logo img{
                                                                                                                                                                                                  width:70px!important;
                                                                                                                                                                                                    height:70px!important;
                                                                                                                                                                                                      object-fit:contain!important;
                                                                                                                                                                                                      }

                                                                                                                                                                                                      .report-cliche-info h2,
                                                                                                                                                                                                      .report-cliche-info h3,
                                                                                                                                                                                                      .report-cliche-info p{
                                                                                                                                                                                                        margin:3px 0!important;
                                                                                                                                                                                                        }

                                                                                                                                                                                                        .report-title{
                                                                                                                                                                                                          text-align:center!important;
                                                                                                                                                                                                            margin:10px 0!important;
                                                                                                                                                                                                            }

                                                                                                                                                                                                            @page{
                                                                                                                                                                                                              size:A4;
                                                                                                                                                                                                                margin:10mm;
                                                                                                                                                                                                                }
                                                                                                                                                                                                                </style>
                                                                                                                                                                                                                </head>

                                                                                                                                                                                                                <body>
                                                                                                                                                                                                                  <div class="print-page">
                                                                                                                                                                                                                      ${element.innerHTML}
                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                        </body>
                                                                                                                                                                                                                        </html>
                                                                                                                                                                                                                        `);

                                                                                                                                                                                                                          doc.close();

                                                                                                                                                                                                                            const printFrame = () => {
                                                                                                                                                                                                                                const win =
                                                                                                                                                                                                                                      iframe.contentWindow;

                                                                                                                                                                                                                                          if (!win) {
                                                                                                                                                                                                                                                document.body.removeChild(iframe);
                                                                                                                                                                                                                                                      return;
                                                                                                                                                                                                                                                          }

                                                                                                                                                                                                                                                              win.focus();
                                                                                                                                                                                                                                                                  win.print();

                                                                                                                                                                                                                                                                      setTimeout(() => {
                                                                                                                                                                                                                                                                            document.body.removeChild(iframe);
                                                                                                                                                                                                                                                                                }, 1000);
                                                                                                                                                                                                                                                                                  };

                                                                                                                                                                                                                                                                                    const images =
                                                                                                                                                                                                                                                                                        doc.images;

                                                                                                                                                                                                                                                                                          if (!images.length) {
                                                                                                                                                                                                                                                                                              setTimeout(printFrame, 300);
                                                                                                                                                                                                                                                                                                  return;
                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                      let loaded = 0;

                                                                                                                                                                                                                                                                                                        const done = () => {
                                                                                                                                                                                                                                                                                                            loaded += 1;

                                                                                                                                                                                                                                                                                                                if (loaded >= images.length) {
                                                                                                                                                                                                                                                                                                                      setTimeout(printFrame, 300);
                                                                                                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                                                                                                            };

                                                                                                                                                                                                                                                                                                                              Array.from(images).forEach((img) => {
                                                                                                                                                                                                                                                                                                                                  if (img.complete) {
                                                                                                                                                                                                                                                                                                                                        done();
                                                                                                                                                                                                                                                                                                                                            } else {
                                                                                                                                                                                                                                                                                                                                                  img.onload = done;
                                                                                                                                                                                                                                                                                                                                                        img.onerror = done;
                                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                                              });
                                                                                                                                                                                                                                                                                                                                                              }
